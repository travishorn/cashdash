import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').Actions} */
export const actions = {
	insert: async ({ request }) => {
		const data = await request.formData();

		await db('Payee').insert({
			id: data.get('id'),
			description: data.get('description') || null
		});

		redirect(303, '/payees');
	}
};
