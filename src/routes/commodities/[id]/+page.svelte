<script>
	import CommodityForm from '$lib/components/CommodityForm.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h2>Edit commodity</h2>

<CommodityForm commodity={data.commodity} />

<form method="post" action="?/delete">
	<button>Delete commodity</button>
</form>
