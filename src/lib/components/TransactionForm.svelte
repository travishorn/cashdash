<script>
	import { indentation } from '$lib';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import FormGroup from './FormGroup.svelte';
	import Input from './Input.svelte';
	import Select from './Select.svelte';

	/** @type {App.Status[]}*/
	export let statuses;

	/** @type {App.Payee[]}*/
	export let payees;

	/** @type {App.Account[]}*/
	export let accounts;

	/** @type {App.Commodity[]}*/
	export let commodities;

	/** @type {App.Transaction|null}*/
	export let transaction = null;

	const action = transaction ? '?/update' : '?/insert';
</script>

<Form method="post" {action}>
	<FormGroup>
		<label for="date">Date</label>
		<Input
			id="date"
			name="date"
			type="date"
			required
			value={transaction?.date.slice(0, 10) || new Date().toISOString().slice(0, 10)}
		/>
	</FormGroup>

	<FormGroup>
		<label for="statusId">Status</label>
		<Select id="statusId" name="statusId" required>
			{#each statuses as status}
				<option value={status.id} selected={status.id === transaction?.statusId || null}
					>{status.id}</option
				>
			{/each}
		</Select>
	</FormGroup>

	<FormGroup>
		<label for="payeeId">Payee</label>
		<Select id="payeeId" name="payeeId" required>
			{#each payees as payee}
				<option value={payee.id} selected={payee.id === transaction?.payeeId || null}
					>{payee.id}</option
				>
			{/each}
		</Select>
	</FormGroup>

	<FormGroup>
		<label for="description">Description</label>
		<Input
			id="description"
			name="description"
			type="text"
			maxlength="255"
			value={transaction?.description || ''}
		/>
	</FormGroup>

	<FormGroup>
		<label for="fromAccountId">From</label>
		<Select id="fromAccountId" name="fromAccountId" required>
			{#each accounts as fromAccount}
				<option
					value={fromAccount.id}
					selected={fromAccount.id === transaction?.fromAccountId || null}
					>{@html indentation(fromAccount.depth || 0)}{fromAccount.id}</option
				>
			{/each}
		</Select>
	</FormGroup>

	<FormGroup>
		<label for="toAccountId">To</label>
		<Select id="toAccountId" name="toAccountId" required>
			{#each accounts as fromAccount}
				<option
					value={fromAccount.id}
					selected={fromAccount.id === transaction?.toAccountId || null}
					>{@html indentation(fromAccount.depth || 0)}{fromAccount.id}</option
				>
			{/each}
		</Select>
	</FormGroup>

	<div class="flex gap-6">
		<FormGroup>
			<label for="amount">Amount</label>
			<Input
				id="amount"
				name="amount"
				type="number"
				min="0"
				step="0.01"
				required
				value={transaction?.amount || 0}
			/>
		</FormGroup>

		<FormGroup>
			<label for="commodityId">Commodity</label>
			<Select id="commodityId" name="commodityId" required>
				{#each commodities as commodity}
					<option value={commodity.id} selected={commodity.id === transaction?.commodityId || null}
						>{commodity.id}</option
					>
				{/each}
			</Select>
		</FormGroup>
	</div>

	<div>
		<Button>{transaction ? 'Update transaction' : 'Create transaction'}</Button>
		<Button type="secondary" href="/transactions">Cancel</Button>
	</div>
</Form>
