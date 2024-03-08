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
			parentAccountId: 'Assets',
			id: 'Venmo',
			description: 'Money in a digital Venmo account accessed via the mobile app.'
		},
		{
			parentAccountId: 'Assets',
			id: 'Roth IRA',
			description: 'Tax-advantaged retirement savings.'
		},
		{
			parentAccountId: 'Assets',
			id: 'House',
			description: 'Primary living residence.'
		},
		{
			parentAccountId: 'Assets',
			id: 'F-150',
			description: '2021 Ford F-150.'
		},
		{
			parentAccountId: 'Expenses',
			id: 'Food',
			description: 'Groceries, dining out, and snacks.'
		},
		{
			parentAccountId: 'Expenses',
			id: 'Loan Interest',
			description: 'Interest paid on borrowed money.'
		},
		{
			parentAccountId: 'Expenses',
			id: 'Utilities',
			description: 'Home utility expenses. Electric, water/sewer, etc.'
		},
		{
			parentAccountId: 'Utilities',
			id: 'Electric',
			description: 'Home electricity service'
		},
		{
			parentAccountId: 'Utilities',
			id: 'Water/Sewer',
			description: 'Home water and sewer service costs.'
		},
		{
			parentAccountId: 'Expenses',
			id: 'Entertainment',
			description: 'Music, movies, TV, video games, sports, etc.'
		},
		{
			parentAccountId: 'Income',
			id: 'Salary',
			description: 'Earnings received from employment.'
		},
		{
			parentAccountId: 'Income',
			id: 'Marketplace',
			description: 'Selling personal/home goods for cash.'
		},
		{
			parentAccountId: 'Liabilities',
			id: 'Mortgage',
			description: 'Money borrowed to purchase home.'
		},
		{
			parentAccountId: 'Liabilities',
			id: 'Auto Loan',
			description: 'Money borrowed to purchase 2021 Ford F-150.'
		}
	]);

	await knex('Payee').whereNotIn('id', ['Opening Balances']).del();
	await knex('Payee').insert([
		{
			id: 'Allied Universal',
			description: 'American private security and staffing company.'
		},
		{
			id: 'AMC',
			description:
				'Movie theater chain offering a diverse film selection and cinematic experiences.'
		},
		{
			id: 'Marketplace user',
			description: 'Any person with which an exchange of personal/home goods for cash might occur.'
		},
		{
			id: "McDonald's",
			description: 'Global fast-food chain known for burgers, fries, and iconic menu items.'
		},
		{
			id: 'Municipal Water Department',
			description: 'Local municipal department providing water and sewer services.'
		},
		{
			id: 'PG&E',
			description: 'Pacific Gas and Electric Company, a major utility providing energy services.'
		},
		{
			id: 'Topgolf',
			description:
				'Entertainment complex combining golf, games, and dining for interactive family fun.'
		},
		{
			id: 'Vanguard',
			description: 'Investment management company offering low-cost mutual funds and ETFs.'
		},
		{
			id: 'Venmo',
			description: 'Mobile app for making quick personal transactions.'
		},
		{
			id: 'Walmart',
			description:
				'American multinational retail corporation that operates a chain of hypermarkets, discount department stores, and grocery stores in the United States.'
		},
		{
			id: 'Wells Fargo',
			description: 'Major bank providing banking, financial, and mortgage services.'
		}
	]);

	await knex('Transaction').del();
	await knex('Transaction').insert([
		{
			id: 'fb929f3a-3467-49ee-83ae-f7d1fd4ce43b',
			statusId: 'Cleared',
			payeeId: 'Opening Balances',
			fromAccountId: 'Opening Balances',
			toAccountId: 'Checking',
			commodityId: 'USD',
			date: new Date('2024-01-01').toISOString(),
			amount: 1084628
		},
		{
			id: 'c1ef77f1-8dc7-41a4-9516-6a120ae4bb8a',
			statusId: 'Cleared',
			payeeId: 'Opening Balances',
			fromAccountId: 'Opening Balances',
			toAccountId: 'Venmo',
			commodityId: 'USD',
			date: new Date('2024-01-01').toISOString(),
			amount: 20347
		},
		{
			id: '5b7a7dc7-a807-45eb-8128-6402decb8f5c',
			statusId: 'Cleared',
			payeeId: 'Opening Balances',
			fromAccountId: 'Opening Balances',
			toAccountId: 'Roth IRA',
			commodityId: 'USD',
			date: new Date('2024-01-01').toISOString(),
			amount: 3010026
		},
		{
			id: 'b132d909-3b8e-4261-be3b-d830d058771e',
			statusId: 'Cleared',
			payeeId: 'Opening Balances',
			fromAccountId: 'Opening Balances',
			toAccountId: 'House',
			commodityId: 'USD',
			date: new Date('2024-01-01').toISOString(),
			amount: 41700000
		},
		{
			id: '2c13b845-338d-494b-b089-7215a3c6bb00',
			statusId: 'Cleared',
			payeeId: 'Opening Balances',
			fromAccountId: 'Opening Balances',
			toAccountId: 'F-150',
			commodityId: 'USD',
			date: new Date('2024-01-01').toISOString(),
			amount: 3190000
		},
		{
			id: 'b9bdaa67-e57d-44ea-add4-ebba2150875f',
			statusId: 'Cleared',
			payeeId: 'Opening Balances',
			fromAccountId: 'Mortgage',
			toAccountId: 'Opening Balances',
			commodityId: 'USD',
			date: new Date('2024-01-01').toISOString(),
			amount: 16799452
		},
		{
			id: '0aed102c-c347-40e1-9f51-68e8696726ef',
			statusId: 'Cleared',
			payeeId: 'Opening Balances',
			fromAccountId: 'Auto Loan',
			toAccountId: 'Opening Balances',
			commodityId: 'USD',
			date: new Date('2024-01-01').toISOString(),
			amount: 1216970
		},
		{
			id: 'f60e43c5-6833-436a-8071-85ec7ea24e15',
			statusId: 'Cleared',
			payeeId: 'Allied Universal',
			fromAccountId: 'Salary',
			toAccountId: 'Checking',
			commodityId: 'USD',
			date: new Date('2024-01-05').toISOString(),
			amount: 126272,
			description: 'Regular paycheck'
		},
		{
			id: '75a837e8-0364-495f-8e80-0d777d0ba607',
			statusId: 'Cleared',
			payeeId: 'Walmart',
			fromAccountId: 'Checking',
			toAccountId: 'Food',
			commodityId: 'USD',
			date: new Date('2024-01-07').toISOString(),
			amount: 18073,
			description: 'Weekly groceries'
		},
		{
			id: '76b172e3-70f0-4648-bcd3-056eb76ca324',
			statusId: 'Cleared',
			payeeId: 'Marketplace user',
			fromAccountId: 'Marketplace',
			toAccountId: 'Venmo',
			commodityId: 'USD',
			date: new Date('2024-01-08').toISOString(),
			amount: 2000,
			description: 'Sold shirt'
		},
		{
			id: '6fff6a39-51a6-4377-8746-5b4b63bb1dc7',
			statusId: 'Cleared',
			payeeId: "McDonald's",
			fromAccountId: 'Checking',
			toAccountId: 'Food',
			commodityId: 'USD',
			date: new Date('2024-01-12').toISOString(),
			amount: 2397,
			description: 'Three combo meals'
		},
		{
			id: '737eede1-6f9c-40d0-a6c1-2eab9c20ce1d',
			statusId: 'Cleared',
			payeeId: 'Walmart',
			fromAccountId: 'Checking',
			toAccountId: 'Food',
			commodityId: 'USD',
			date: new Date('2024-01-14').toISOString(),
			amount: 16432,
			description: 'Weekly groceries'
		},
		{
			id: '3de3538f-f507-49c5-81b1-576c4f21c10c',
			statusId: 'Cleared',
			payeeId: 'Vanguard',
			fromAccountId: 'Checking',
			toAccountId: 'Roth IRA',
			commodityId: 'USD',
			date: new Date('2024-01-15').toISOString(),
			amount: 25000,
			description: 'Retirement contribution'
		},
		{
			id: 'b38de0fe-46e8-468d-82bd-14669f1b6d9a',
			statusId: 'Cleared',
			payeeId: 'PG&E',
			fromAccountId: 'Checking',
			toAccountId: 'Electric',
			commodityId: 'USD',
			date: new Date('2024-01-15').toISOString(),
			amount: 14923,
			description: 'One month electric service'
		},
		{
			id: 'bd2bfdc6-d811-416c-91ef-be16b1fc9779',
			statusId: 'Cleared',
			payeeId: 'Wells Fargo',
			fromAccountId: 'Checking',
			toAccountId: 'Mortgage',
			commodityId: 'USD',
			date: new Date('2024-01-15').toISOString(),
			amount: 169494,
			description: 'Monthly mortgage payment'
		},
		{
			id: 'f95cb1d9-6edc-4d5a-be6d-e5b998eb8ea2',
			statusId: 'Cleared',
			payeeId: 'Wells Fargo',
			fromAccountId: 'Checking',
			toAccountId: 'Loan Interest',
			commodityId: 'USD',
			date: new Date('2024-01-15').toISOString(),
			amount: 112996,
			description: 'Interest on mortgage'
		},
		{
			id: '2d177eb5-0098-4318-a1f5-7807242270b2',
			statusId: 'Cleared',
			payeeId: 'Municipal Water Department',
			fromAccountId: 'Checking',
			toAccountId: 'Water/Sewer',
			commodityId: 'USD',
			date: new Date('2024-01-15').toISOString(),
			amount: 5461,
			description: 'One month water/sewer service'
		},
		{
			id: 'f8d12224-5283-4fa7-a57f-3b70646dd82c',
			statusId: 'Cleared',
			payeeId: 'AMC',
			fromAccountId: 'Checking',
			toAccountId: 'Entertainment',
			commodityId: 'USD',
			date: new Date('2024-01-16').toISOString(),
			amount: 2910,
			description: 'Three movie tickets'
		},
		{
			id: '40f685a7-5323-4db0-b8c1-96340de0b771',
			statusId: 'Cleared',
			payeeId: 'Allied Universal',
			fromAccountId: 'Salary',
			toAccountId: 'Checking',
			commodityId: 'USD',
			date: new Date('2024-01-19').toISOString(),
			amount: 126272,
			description: 'Regular paycheck'
		},
		{
			id: '752a6250-e299-40a6-bfbc-9742611df88e',
			statusId: 'Cleared',
			payeeId: 'Wells Fargo',
			fromAccountId: 'Checking',
			toAccountId: 'Auto Loan',
			commodityId: 'USD',
			date: new Date('2024-01-20').toISOString(),
			amount: 48682,
			description: 'Monthly truck payment'
		},
		{
			id: '2fb91862-9348-4692-83e5-b433247e0bb2',
			statusId: 'Cleared',
			payeeId: 'Wells Fargo',
			fromAccountId: 'Checking',
			toAccountId: 'Loan Interest',
			commodityId: 'USD',
			date: new Date('2024-01-20').toISOString(),
			amount: 3664,
			description: 'Interest on auto loan'
		},
		{
			id: 'a35ee9de-1880-427f-8e41-01724283eceb',
			statusId: 'Cleared',
			payeeId: 'Walmart',
			fromAccountId: 'Checking',
			toAccountId: 'Food',
			commodityId: 'USD',
			date: new Date('2024-01-21').toISOString(),
			amount: 18294,
			description: 'Weekly groceries'
		},
		{
			id: '0517d3f3-18dc-49b1-8247-e217a6d2d57c',
			statusId: 'Cleared',
			payeeId: 'Marketplace user',
			fromAccountId: 'Marketplace',
			toAccountId: 'Venmo',
			commodityId: 'USD',
			date: new Date('2024-01-26').toISOString(),
			amount: 10000,
			description: 'Sold lamp'
		},
		{
			id: '967cd0ae-dfb4-440c-8ed2-eeb699bc27fc',
			statusId: 'Cleared',
			payeeId: 'Topgolf',
			fromAccountId: 'Checking',
			toAccountId: 'Entertainment',
			commodityId: 'USD',
			date: new Date('2024-01-26').toISOString(),
			amount: 3403,
			description: 'One hour booth rental'
		},
		{
			id: 'bccffa97-d262-4ab8-8805-d53e753bef46',
			statusId: 'Cleared',
			payeeId: "McDonald's",
			fromAccountId: 'Checking',
			toAccountId: 'Food',
			commodityId: 'USD',
			date: new Date('2024-01-26').toISOString(),
			amount: 1366,
			description: 'Combo meal + shake'
		},
		{
			id: 'a8c564b8-6b0e-4f49-b59c-9f65c862e689',
			statusId: 'Cleared',
			payeeId: 'Venmo',
			fromAccountId: 'Venmo',
			toAccountId: 'Checking',
			commodityId: 'USD',
			date: new Date('2024-01-27').toISOString(),
			amount: 32347,
			description: 'Transfer from Venmo to Checking'
		},
		{
			id: 'de9f33d1-8519-4455-80ca-2d57f1660b11',
			statusId: 'Pending',
			payeeId: 'Walmart',
			fromAccountId: 'Checking',
			toAccountId: 'Food',
			commodityId: 'USD',
			date: new Date('2024-01-28').toISOString(),
			amount: 16349,
			description: 'Weekly groceries'
		}
	]);
};
