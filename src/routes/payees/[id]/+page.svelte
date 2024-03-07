<script>
	import PayeeForm from '$lib/components/PayeeForm.svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<PayeeForm payee={data.payee} />

<hr class="mt-56 mb-5 border border-zinc-800" />

<form method="post" action="?/delete">
	<Button type="danger">Delete payee</Button>
</form>
