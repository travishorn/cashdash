<script>
	import CommodityForm from '$lib/components/CommodityForm.svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<CommodityForm commodity={data.commodity} />

<hr class="mt-56 mb-5 border border-zinc-800" />

<form method="post" action="?/delete">
	<Button type="danger">Delete commodity</Button>
</form>
