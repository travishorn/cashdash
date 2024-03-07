<script>
	import { indentation } from '$lib';
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import FormGroup from './FormGroup.svelte';
	import Input from './Input.svelte';
	import Select from './Select.svelte';

	/** @type {App.Account[]}*/
	export let accounts;

	/** @type {App.Account|null}*/
	export let account = null;

	const action = account ? '?/update' : '?/insert';
</script>

<Form method="post" {action}>
	<FormGroup>
		<label for="parentAccountId">Parent account</label>
		<Select id="parentAccountId" name="parentAccountId" required>
			{#each accounts as parentAccount}
				<option
					value={parentAccount.id}
					selected={parentAccount.id === account?.parentAccountId || null}
					>{@html indentation(parentAccount.depth || 0)}{parentAccount.id}</option
				>
			{/each}
		</Select>
	</FormGroup>

	<FormGroup>
		<label for="id">Name</label>
		<Input id="id" name="id" type="text" maxlength="100" required value={account?.id || ''} />
	</FormGroup>

	<FormGroup>
		<label for="description">Description</label>
		<Input
			id="description"
			name="description"
			type="text"
			maxlength="255"
			value={account?.description || ''}
		/>
	</FormGroup>

	<div>
		<Button>{account ? 'Update account' : 'Create account'}</Button>
		<Button type="secondary" href="/accounts">Cancel</Button>
	</div>
</Form>
