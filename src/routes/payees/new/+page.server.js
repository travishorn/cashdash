import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').Actions} */
export const actions = {
	insert: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');
		const description = data.get('description') || null;

		await db('Payee').insert({
			id,
			description
		});

		redirect(303, '/payees');
	}
};
