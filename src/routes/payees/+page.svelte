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
	<Button href="/payees/new">Add new payee</Button>
</ActionBar>

<Table>
	<thead>
		<tr>
			<TableHeader>Payee</TableHeader>
			<TableHeader>Description</TableHeader>
		</tr>
	</thead>
	<tbody>
		{#each data.payees as payee, i}
			<TableBodyRow {i}>
				{#if payee.id === 'Opening Balances'}
					<TableDataCell>{payee.id}</TableDataCell>
				{:else}
					<TableDataCell><Link href={`/payees/${payee.id}`}>{payee.id}</Link></TableDataCell>
				{/if}
				<TableDataCell muted>{payee.description || ''}</TableDataCell>
			</TableBodyRow>
		{/each}
	</tbody>
</Table>
