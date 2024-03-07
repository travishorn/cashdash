import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const accounts = await db.raw(`
WITH RECURSIVE AccountHierarchy AS (
	SELECT    id,
						id hierarchy,
						0 depth
	FROM      Account
	WHERE     parentAccountId IS NULL
	UNION ALL
	SELECT    a.id,
						h.hierarchy || '|' || a.id hierarchy,
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

	const account = (
		await db('Account')
			.select(['id', 'parentAccountId', 'description'])
			.where({ id: params.id })
			.limit(1)
	)[0];

	return {
		accounts,
		account
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();
		const id = data.get('id');
		const parentAccountId = data.get('parentAccountId') || null;
		const description = data.get('description') || null;

		await db('Account')
			.update({
				id,
				parentAccountId,
				description
			})
			.where({ id: params.id });

		redirect(303, '/accounts');
	},
	delete: async ({ params }) => {
		await db('Account').where({ id: params.id }).del();
		redirect(303, '/accounts');
	}
};
