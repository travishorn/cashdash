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
						id path,
						id topLevelAccountId
	FROM      Account
	WHERE     parentAccountId IS NULL
	UNION ALL
	SELECT    a.id,
						a.parentAccountId,
						a.description,
						ah.depth + 1,
						ah.path || ':' || a.id path,
						ah.topLevelAccountId
	FROM      Account a
	JOIN      AccountHierarchy ah
	ON        a.parentAccountId = ah.id
)
SELECT    id,
					parentAccountId,
					description,
					depth,
					path,
					topLevelAccountId
FROM      AccountHierarchy;
`).raw(`
CREATE VIEW TransactionDoubleEntry AS
SELECT      Credit.toAccountId accountId,
            DATE(Credit.date) date,
            Credit.amount,
            Credit.commodityId
FROM        \`Transaction\` Credit
JOIN        Commodity
ON          Commodity.id = Credit.commodityId
UNION ALL 
SELECT      Debit.fromAccountId accountId,
            DATE(Debit.date) date,
            Debit.amount * -1 amount,
            Debit.commodityId
FROM        \`Transaction\` Debit
JOIN        Commodity
ON          Commodity.id = Debit.commodityId;
`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema
		.dropView('TransactionDoubleEntry')
		.dropView('AccountHierarcy')
		.dropTable('Transaction')
		.dropTable('Payee')
		.dropTable('Status')
		.dropTable('Commodity')
		.dropTable('Account');
};
