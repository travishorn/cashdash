<script>
	/** @type {import('./$types').PageData} */
	export let data;

	const transactions = data.transactions.map((transaction) => {
		const date = new Date(transaction.date);
		date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

		return {
			...transaction,
			date: date.toLocaleDateString(),
			amount: (transaction.amount / transaction.decimalFactor).toLocaleString(undefined, {
				style: 'currency',
				currency: transaction.commodityId
			})
		};
	});
</script>

<h2>Transactions</h2>

<a href="/transactions/new">Add new transaction</a>

<table>
	<thead>
		<tr>
			<th>Date</th>
			<th>Status</th>
			<th>Payee</th>
			<th>Description</th>
			<th>From</th>
			<th>To</th>
			<th>Amount</th>
		</tr>
	</thead>
	<tbody>
		{#each transactions as transaction}
			<tr>
				<td>{transaction.date}</td>
				<td>{transaction.statusId}</td>
				<td>{transaction.payeeId}</td>
				<td>{transaction.description || ''}</td>
				<td>{transaction.fromAccountId}</td>
				<td>{transaction.toAccountId}</td>
				<td>{transaction.amount}</td>
			</tr>
		{/each}
	</tbody>
</table>
