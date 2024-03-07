import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		payee: (await db('Payee').select(['id', 'description']).where({ id: params.id }).limit(1))[0]
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();
		const id = data.get('id');
		const description = data.get('description') || null;

		await db('Payee')
			.update({
				id,
				description
			})
			.where({ id: params.id });

		redirect(303, '/payees');
	},
	delete: async ({ params }) => {
		await db('Payee').where({ id: params.id }).del();
		redirect(303, '/payees');
	}
};
