import { db } from '$lib/server/database.js';
import lodash from 'lodash';

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

	return {
		balances: groupBy(ungroupedBalances, (b) => b.topLevelAccountId)
	};
}
