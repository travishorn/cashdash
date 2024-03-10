import lodash from 'lodash';
import * as Plot from '@observablehq/plot';
import { JSDOM } from 'jsdom';
import { db } from '$lib/server/database.js';

const { document } = new JSDOM().window;
const { groupBy } = lodash;

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const ungroupedBalances = (
		await db.raw(`
SELECT      ah.topLevelAccountId,
            ah.id accountId,
            tde.commodityId,
            CAST(SUM(tde.amount) AS REAL) / c.decimalFactor balance,
            ah.depth
FROM        AccountHierarchy ah
LEFT JOIN   TransactionDoubleEntry tde
ON          tde.accountId = ah.id
LEFT JOIN   Commodity c
ON          c.id = tde.commodityId
GROUP BY    ah.id,
            tde.commodityId,
            ah.depth
ORDER BY    ah.path    
`)
	).filter((/** @type {App.Balance} */ b) => b.accountId !== b.topLevelAccountId);

	const balances = groupBy(ungroupedBalances, (b) => b.topLevelAccountId);

	Object.keys(balances).forEach((topLevelAccountId) => {
		const accounts = balances[topLevelAccountId].filter((a) => a.balance);
		const plotAccounts = accounts.map((a) => {
			return {
				...a,
				balance: ['Income', 'Liabilities'].includes(a.topLevelAccountId) ? -a.balance : a.balance
			};
		});

		const plot = Plot.plot({
			marginLeft: 100,
			y: {
				padding: 0.2,
				inset: 0
			},
			marks: [
				Plot.axisY({ label: null }),
				Plot.axisX({ label: null }),
				Plot.barX(plotAccounts, { x: 'balance', y: 'accountId', fill: 'accountId' })
			],
			document
		}).outerHTML;

		balances[topLevelAccountId] = { accounts, plot };
	});

	return {
		balances
	};
}
