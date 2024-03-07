<script>
	import AccountForm from '$lib/components/AccountForm.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h2>Edit account</h2>

<AccountForm accounts={data.accounts} account={data.account} />

<form method="post" action="?/delete">
	<button>Delete account</button>
</form>
