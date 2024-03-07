import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		accounts: await db('AccountHierarchy').select('id', 'description', 'depth').orderBy('path')
	};
}
