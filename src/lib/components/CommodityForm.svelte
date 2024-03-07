<script>
	import Button from './Button.svelte';
	import Form from './Form.svelte';
	import FormGroup from './FormGroup.svelte';
	import Input from './Input.svelte';

	/** @type {App.Commodity|null}*/
	export let commodity = null;

	const action = commodity ? '?/update' : '?/insert';
</script>

<Form method="post" {action}>
	<FormGroup>
		<label for="id">Name</label>
		<Input id="id" name="id" type="text" maxlength="5" required value={commodity?.id || ''} />
	</FormGroup>

	<FormGroup>
		<label for="decimalFactor">Decimal factor</label>
		<Input
			id="decimalFactor"
			name="decimalFactor"
			type="number"
			min="0"
			required
			value={commodity?.decimalFactor || 100}
		/>
	</FormGroup>

	<FormGroup>
		<label for="description">Description</label>
		<Input
			id="description"
			name="description"
			type="text"
			maxlength="255"
			value={commodity?.description || ''}
		/>
	</FormGroup>

	<div>
		<Button>{commodity ? 'Update commodity' : 'Create commodity'}</Button>
		<Button type="secondary" href="/commodities">Cancel</Button>
	</div>
</Form>
