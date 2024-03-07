<script>
	import AccountForm from '$lib/components/AccountForm.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h2>Add new account</h2>

<AccountForm accounts={data.accounts} />
