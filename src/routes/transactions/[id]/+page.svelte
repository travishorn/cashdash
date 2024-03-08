<script>
	import TransactionForm from '$lib/components/TransactionForm.svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<TransactionForm
	accounts={data.accounts}
	commodities={data.commodities}
	payees={data.payees}
	statuses={data.statuses}
	transaction={data.transaction}
/>

<hr class="mt-56 mb-5 border border-zinc-800" />

<form method="post" action="?/delete">
	<Button type="danger">Delete transaction</Button>
</form>
