<script>
	import Table from '$lib/components/Table.svelte';
	import TableBodyRow from '$lib/components/TableBodyRow.svelte';
	import TableDataCell from '$lib/components/TableDataCell.svelte';
	import { indentation } from '$lib';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="flex flex-col gap-32">
	{#each Object.entries(data.balances) as [accountId, balance]}
		<div>
			<h3>{accountId}</h3>
			<div class="flex gap-16">
				<div class="w-1/3">
					<Table>
						<tbody>
							{#each balance.accounts as account, i}
								<TableBodyRow {i}>
									<TableDataCell
										>{@html indentation(account.depth || 0)}{account.accountId}</TableDataCell
									>
									<TableDataCell numeric
										>{account.balance !== null
											? account.balance.toLocaleString(undefined, {
													style: 'currency',
													currency: account.commodityId
												})
											: ''}</TableDataCell
									>
								</TableBodyRow>
							{/each}
						</tbody>
					</Table>
				</div>
				<div class="w-2/3">
					{@html balance.plot}
				</div>
			</div>
		</div>
	{/each}
</div>
