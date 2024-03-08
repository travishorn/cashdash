<script>
	import { indentation } from '$lib';
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
	<Button href="/accounts/new">Add new account</Button>
</ActionBar>

<Table>
	<thead>
		<tr>
			<TableHeader>Account</TableHeader>
			<TableHeader>Description</TableHeader>
		</tr>
	</thead>
	<tbody>
		{#each data.accounts as account, i}
			<TableBodyRow {i}>
				{#if account.depth === 0 || account.id === 'Opening Balances'}
					<TableDataCell
						><span class="tracking-[0.25em]">{@html indentation(account.depth || 0)}</span
						>{account.id}</TableDataCell
					>
				{:else}
					<TableDataCell
						><span class="tracking-[0.25em]">{@html indentation(account.depth || 0)}</span><Link
							href={`/accounts/${account.id}`}>{account.id}</Link
						></TableDataCell
					>
				{/if}
				<TableDataCell muted>{account.description || ''}</TableDataCell>
			</TableBodyRow>
		{/each}
	</tbody>
</Table>
