<script>
	import AccountForm from '$lib/components/AccountForm.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<AccountForm accounts={data.accounts} />
