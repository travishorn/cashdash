<script>
	import ActionBar from '$lib/components/ActionBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Table from '$lib/components/Table.svelte';
	import TableHeader from '$lib/components/TableHeader.svelte';
	import TableBodyRow from '$lib/components/TableBodyRow.svelte';
	import TableDataCell from '$lib/components/TableDataCell.svelte';

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

<ActionBar>
	<Button href="/transactions/new">Add new transaction</Button>
</ActionBar>

<Table>
	<thead>
		<tr>
			<TableHeader>Date</TableHeader>
			<TableHeader>Status</TableHeader>
			<TableHeader>Payee</TableHeader>
			<TableHeader>Description</TableHeader>
			<TableHeader>From</TableHeader>
			<TableHeader>To</TableHeader>
			<TableHeader align="right">Amount</TableHeader>
		</tr>
	</thead>
	<tbody>
		{#each transactions as transaction, i}
			<TableBodyRow {i}>
				<TableDataCell>{transaction.date}</TableDataCell>
				<TableDataCell>{transaction.statusId}</TableDataCell>
				<TableDataCell>{transaction.payeeId}</TableDataCell>
				<TableDataCell muted>{transaction.description || ''}</TableDataCell>
				<TableDataCell>{transaction.fromAccountId}</TableDataCell>
				<TableDataCell>{transaction.toAccountId}</TableDataCell>
				<TableDataCell numeric>{transaction.amount}</TableDataCell>
			</TableBodyRow>
		{/each}
	</tbody>
</Table>
