import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const accounts = await db('Account').select('*');

	return {
		accounts
	};
}
