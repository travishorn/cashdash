import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const transactions = await db('Transaction')
		.join('Commodity', 'Commodity.id', '=', 'Transaction.commodityId')
		.select([
			'Transaction.date',
			'Transaction.statusId',
			'Transaction.payeeId',
			'Transaction.description',
			'Transaction.fromAccountId',
			'Transaction.toAccountId',
			'Transaction.amount',
			'Transaction.commodityId',
			'Commodity.decimalFactor'
		])
		.orderBy([
			'Transaction.date',
			'Transaction.statusId',
			'Transaction.payeeId',
			'Transaction.fromAccountId',
			'Transaction.toAccountId',
			'Transaction.commodityId',
			'Transaction.amount'
		]);

	return {
		transactions
	};
}
