import { db } from '$lib/server/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const accounts = await db.raw(`
WITH RECURSIVE AccountHierarchy AS (
	SELECT    id,
						id hierarchy,
						description,
						0 depth
	FROM      Account
	WHERE     parentAccountId IS NULL
	UNION ALL
	SELECT    a.id,
						h.hierarchy || '|' || a.id hierarchy,
						a.description,
						h.depth + 1
	FROM      Account a
	JOIN      AccountHierarchy h
	ON        a.parentAccountId = h.id
)
SELECT    id,
					description,
					depth
FROM      AccountHierarchy
ORDER BY  hierarchy	
`);

	return {
		accounts
	};
}
