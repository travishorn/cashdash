/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = (knex) => {
	return knex.schema
		.createTable('Account', (table) => {
			table.string('id', 100).primary();
			table.string('parentAccountId', 100).references('id').inTable('Account');
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
			table.string('statusId', 7).notNullable().references('id').inTable('Status');
			table.string('payeeId', 100).notNullable().references('id').inTable('Payee');
			table.string('fromAccountId', 100).notNullable().references('id').inTable('Account');
			table.string('toAccountId', 100).notNullable().references('id').inTable('Account');
			table.string('commodityId', 5).notNullable().references('id').inTable('Commodity');
			table.date('date').notNullable();
			table.integer('amount').notNullable();
			table.text('description');
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = (knex) => {
	return knex.schema
		.dropTable('Transaction')
		.dropTable('Payee')
		.dropTable('Status')
		.dropTable('Commodity')
		.dropTable('Account');
};
