import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const transaction = (
		await db('Transaction')
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
			.where({ 'Transaction.id': params.id })
			.limit(1)
	)[0];

	transaction.amount /= transaction.decimalFactor;

	return {
		accounts: await db('AccountHierarchy').select('id', 'description', 'depth').orderBy('path'),
		commodities: await db('Commodity').select('id').orderBy('id'),
		payees: await db('Payee').select('id').orderBy('id'),
		statuses: await db('Status').select('id').orderBy('id'),
		transaction
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();
		const { decimalFactor } = (
			await db('Commodity')
				.select('decimalFactor')
				.where({ id: data.get('commodityId') })
				.limit(1)
		)[0];

		await db('Transaction')
			.update({
				statusId: data.get('statusId'),
				payeeId: data.get('payeeId'),
				fromAccountId: data.get('fromAccountId'),
				toAccountId: data.get('toAccountId'),
				commodityId: data.get('commodityId'),
				date: data.get('date'),
				amount: parseInt((Number(data.get('amount') || 0) * decimalFactor).toFixed(0), 10),
				description: data.get('description')
			})
			.where({ id: params.id });

		redirect(303, '/transactions');
	},
	delete: async ({ params }) => {
		await db('Transaction').where({ id: params.id }).del();
		redirect(303, '/transactions');
	}
};
