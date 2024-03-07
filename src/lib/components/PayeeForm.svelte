<script>
	/** @type {App.Payee|null}*/
	export let payee = null;

	const action = payee ? '?/update' : '?/insert';
</script>

<form method="post" {action}>
	<div>
		<label for="id">Name</label>
		<input id="id" name="id" type="text" maxlength="100" required value={payee?.id || ''} />
	</div>

	<div>
		<label for="description">Description</label>
		<input
			id="description"
			name="description"
			type="text"
			maxlength="255"
			value={payee?.description || ''}
		/>
	</div>

	<button>Save</button>
	<a href="/payees">Cancel</a>
</form>
