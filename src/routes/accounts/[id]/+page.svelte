<script>
	import AccountForm from '$lib/components/AccountForm.svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<AccountForm accounts={data.accounts} account={data.account} />

<hr class="mt-56 mb-5 border border-zinc-800" />

<form method="post" action="?/delete">
	<Button type="danger">Delete account</Button>
</form>
