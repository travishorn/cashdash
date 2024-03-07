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
		const id = data.get('id');
		const parentAccountId = data.get('parentAccountId') || null;
		const description = data.get('description') || null;

		await db('Account').insert({
			id,
			parentAccountId,
			description
		});

		redirect(303, '/accounts');
	}
};
