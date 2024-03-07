import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		accounts: await db('AccountHierarchy')
			.select('id', 'description', 'depth')
			.whereNot({ id: params.id })
			.andWhereNot('path', 'LIKE', `%:${params.id}:%`)
			.orderBy('path'),
		account: (
			await db('Account')
				.select(['id', 'parentAccountId', 'description'])
				.where({ id: params.id })
				.limit(1)
		)[0]
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();
		const id = data.get('id');
		const parentAccountId = data.get('parentAccountId') || null;
		const description = data.get('description') || null;

		await db('Account')
			.update({
				id,
				parentAccountId,
				description
			})
			.where({ id: params.id });

		redirect(303, '/accounts');
	},
	delete: async ({ params }) => {
		await db('Account').where({ id: params.id }).del();
		redirect(303, '/accounts');
	}
};
