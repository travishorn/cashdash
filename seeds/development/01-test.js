/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
	await knex('Account')
		.whereNotIn('id', ['Assets', 'Equity', 'Expenses', 'Income', 'Liabilities', 'Opening Balances'])
		.del();

	await knex('Account').insert([
		{
			parentAccountId: 'Assets',
			id: 'Checking',
			description:
				'My primary account for managing liquid funds and day-to-day financial transactions.'
		},
		{
			parentAccountId: 'Expenses',
			id: 'Groceries',
			description: 'Essential food and household items.'
		},
		{
			parentAccountId: 'Income',
			id: 'Salary',
			description: 'Earnings received from employment.'
		}
	]);

	await knex('Payee').whereNotIn('id', ['Opening Balances']).del();
	await knex('Payee').insert([
		{
			id: 'ACME Corporation',
			description: 'Dynamic and innovative multinational company.'
		},
		{
			id: 'Walmart',
			description:
				'American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores in the United States.'
		}
	]);

	await knex('Transaction').del();
	await knex('Transaction').insert([
		{
			id: '0b25f63c-8318-464e-894f-39c370e43244',
			statusId: 'Cleared',
			payeeId: 'Opening Balances',
			fromAccountId: 'Opening Balances',
			toAccountId: 'Checking',
			commodityId: 'USD',
			date: new Date('2024-01-01').toISOString(),
			amount: 1000000,
			description: 'Placing the initial amount in the account on this date'
		},
		{
			id: '584d06bf-47c3-4c82-bc38-7de762fdbf13',
			statusId: 'Cleared',
			payeeId: 'ACME Corporation',
			fromAccountId: 'Salary',
			toAccountId: 'Checking',
			commodityId: 'USD',
			date: new Date('2024-01-05').toISOString(),
			amount: 120000,
			description: 'Paycheck'
		},
		{
			id: '9b56f3ec-26ed-4601-a257-cc5002ca3607',
			statusId: 'Cleared',
			payeeId: 'Walmart',
			fromAccountId: 'Checking',
			toAccountId: 'Groceries',
			commodityId: 'USD',
			date: new Date('2024-01-07').toISOString(),
			amount: 18000,
			description: 'Groceries for the week'
		}
	]);
};
