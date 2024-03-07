<script>
	import PayeeForm from '$lib/components/PayeeForm.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h2>Edit payee</h2>

<PayeeForm payee={data.payee} />

<form method="post" action="?/delete">
	<button>Delete payee</button>
</form>
