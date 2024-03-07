<script>
	import ActionBar from '$lib/components/ActionBar.svelte';
	import Button from '$lib/components/Button.svelte';
	import Table from '$lib/components/Table.svelte';
	import TableHeader from '$lib/components/TableHeader.svelte';
	import TableBodyRow from '$lib/components/TableBodyRow.svelte';
	import TableDataCell from '$lib/components/TableDataCell.svelte';
	import Link from '$lib/components/Link.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<ActionBar>
	<Button href="/commodities/new">Add new commodity</Button>
</ActionBar>

<Table>
	<thead>
		<tr>
			<TableHeader>Commodity</TableHeader>
			<TableHeader align="right">Decimal Factor</TableHeader>
			<TableHeader>Description</TableHeader>
		</tr>
	</thead>
	<tbody>
		{#each data.commodities as commodity, i}
			<TableBodyRow {i}>
				<TableDataCell
					><Link href={`/commodities/${commodity.id}`}>{commodity.id}</Link></TableDataCell
				>
				<TableDataCell numeric>{commodity.decimalFactor}</TableDataCell>
				<TableDataCell muted>{commodity.description || ''}</TableDataCell>
			</TableBodyRow>
		{/each}
	</tbody>
</Table>
