import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const accounts = await db.raw(`
WITH RECURSIVE AccountHierarchy AS (
	SELECT    id,
						id hierarchy,
						0 depth
	FROM      Account
	WHERE     parentAccountId IS NULL
	UNION ALL
	SELECT    a.id,
						h.id || '|' || a.id hierarchy,
						h.depth + 1
	FROM      Account a
	JOIN      AccountHierarchy h
	ON        a.parentAccountId = h.id
)
SELECT    id,
					depth
FROM      AccountHierarchy
ORDER BY  hierarchy	
`);

	return {
		accounts
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
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
