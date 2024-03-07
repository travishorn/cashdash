import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const commodities = await db('Commodity').select(['id', 'decimalFactor', 'description']);

	return {
		commodities
	};
}
