import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		payees: await db('Payee').select(['id', 'description']).orderBy('id')
	};
}
