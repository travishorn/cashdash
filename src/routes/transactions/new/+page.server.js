import { randomUUID } from 'node:crypto';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		accounts: await db('AccountHierarchy').select('id', 'description', 'depth').orderBy('path'),
		commodities: await db('Commodity').select('id').orderBy('id'),
		payees: await db('Payee').select('id').orderBy('id'),
		statuses: await db('Status').select('id').orderBy('id')
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	insert: async ({ request }) => {
		const data = await request.formData();
		const { decimalFactor } = (
			await db('Commodity')
				.select('decimalFactor')
				.where({ id: data.get('commodityId') })
				.limit(1)
		)[0];

		await db('Transaction').insert({
			id: randomUUID(),
			statusId: data.get('statusId'),
			payeeId: data.get('payeeId'),
			fromAccountId: data.get('fromAccountId'),
			toAccountId: data.get('toAccountId'),
			commodityId: data.get('commodityId'),
			date: data.get('date'),
			amount: parseInt((Number(data.get('amount') || 0) * decimalFactor).toFixed(0), 10),
			description: data.get('description')
		});

		redirect(303, '/transactions');
	}
};
