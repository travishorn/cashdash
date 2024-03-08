import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		accounts: await db('AccountHierarchy').select('id', 'description', 'depth').orderBy('path')
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	insert: async ({ request }) => {
		const data = await request.formData();

		await db('Account').insert({
			id: data.get('id'),
			parentAccountId: data.get('parentAccountId') || null,
			description: data.get('description') || null
		});

		redirect(303, '/accounts');
	}
};
