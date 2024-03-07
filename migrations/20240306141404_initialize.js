/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
	return knex.schema
		.createTable('Account', (table) => {
			table.string('id', 100).primary();
			table.string('parentAccountId', 100).references('id').inTable('Account').onUpdate('CASCADE');
			table.text('description');
		})
		.createTable('Commodity', (table) => {
			table.string('id', 5).primary();
			table.integer('decimalFactor').notNullable();
			table.text('description');
		})
		.createTable('Status', (table) => {
			table.string('id', 7).primary();
			table.text('description');
		})
		.createTable('Payee', (table) => {
			table.string('id', 100).primary();
			table.text('description');
		})
		.createTable('Transaction', (table) => {
			table.uuid('id').primary();
			table
				.string('statusId', 7)
				.notNullable()
				.references('id')
				.inTable('Status')
				.onUpdate('CASCADE');
			table
				.string('payeeId', 100)
				.notNullable()
				.references('id')
				.inTable('Payee')
				.onUpdate('CASCADE');
			table
				.string('fromAccountId', 100)
				.notNullable()
				.references('id')
				.inTable('Account')
				.onUpdate('CASCADE');
			table
				.string('toAccountId', 100)
				.notNullable()
				.references('id')
				.inTable('Account')
				.onUpdate('CASCADE');
			table
				.string('commodityId', 5)
				.notNullable()
				.references('id')
				.inTable('Commodity')
				.onUpdate('CASCADE');
			table.date('date').notNullable();
			table.integer('amount').notNullable();
			table.text('description');
		}).raw(`
CREATE VIEW AccountHierarchy AS
WITH RECURSIVE AccountHierarchy AS (
	SELECT    id,
						parentAccountId,
						description,
						0 depth,
						id path
	FROM      Account
	WHERE     parentAccountId IS NULL
	UNION ALL
	SELECT    a.id,
						a.parentAccountId,
						a.description,
						h.depth + 1,
						h.path || ':' || a.id path
	FROM      Account a
	JOIN      AccountHierarchy h
	ON        a.parentAccountId = h.id
)
SELECT    id,
					parentAccountId,
					description,
					depth,
					path
FROM      AccountHierarchy;		
`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema
		.raw('DROP VIEW AccountHierarchy;')
		.dropTable('Transaction')
		.dropTable('Payee')
		.dropTable('Status')
		.dropTable('Commodity')
		.dropTable('Account');
};
