<script>
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import FormGroup from './FormGroup.svelte';
	import Input from './Input.svelte';

	/** @type {App.Payee|null}*/
	export let payee = null;

	const action = payee ? '?/update' : '?/insert';
</script>

<Form method="post" {action}>
	<FormGroup>
		<label for="id">Name</label>
		<Input id="id" name="id" type="text" maxlength="100" required value={payee?.id || ''} />
	</FormGroup>

	<FormGroup>
		<label for="description">Description</label>
		<Input
			id="description"
			name="description"
			type="text"
			maxlength="255"
			value={payee?.description || ''}
		/>
	</FormGroup>

	<div>
		<Button>Save</Button>
		<Button type="secondary" href="/payees">Cancel</Button>
	</div>
</Form>
