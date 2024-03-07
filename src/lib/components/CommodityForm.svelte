<script>
	/** @type {App.Commodity|null}*/
	export let commodity = null;

	const action = commodity ? '?/update' : '?/insert';
</script>

<form method="post" {action}>
	<div>
		<label for="id">Name</label>
		<input id="id" name="id" type="text" maxlength="5" required value={commodity?.id || ''} />
	</div>

	<div>
		<label for="decimalFactor">Decimal factor</label>
		<input
			id="decimalFactor"
			name="decimalFactor"
			type="number"
			min="0"
			required
			value={commodity?.decimalFactor || 100}
		/>
	</div>

	<div>
		<label for="description">Description</label>
		<input
			id="description"
			name="description"
			type="text"
			maxlength="255"
			value={commodity?.description || ''}
		/>
	</div>

	<button>Save</button>
	<a href="/commodities">Cancel</a>
</form>
