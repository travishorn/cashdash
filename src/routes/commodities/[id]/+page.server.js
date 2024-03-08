import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		commodity: (
			await db('Commodity')
				.select(['id', 'decimalFactor', 'description'])
				.where({ id: params.id })
				.limit(1)
		)[0]
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();

		await db('Commodity')
			.update({
				id: data.get('id'),
				decimalFactor: data.get('decimalFactor'),
				description: data.get('description') || null
			})
			.where({ id: params.id });

		redirect(303, '/commodities');
	},
	delete: async ({ params }) => {
		await db('Commodity').where({ id: params.id }).del();
		redirect(303, '/commodities');
	}
};
