<script>
	import TransactionForm from '$lib/components/TransactionForm.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<TransactionForm
	accounts={data.accounts}
	commodities={data.commodities}
	payees={data.payees}
	statuses={data.statuses}
/>
