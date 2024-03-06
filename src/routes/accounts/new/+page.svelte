<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h2>Add new account</h2>

<form method="post">
	<div>
		<label for="parentAccountId">Parent account</label>
		<select id="parentAccountId" name="parentAccountId">
			<option value="">None (top-level)</option>
			{#each data.accounts as account}
				<option value={account.id}>{account.id}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="id">Name</label>
		<input id="id" name="id" type="text" maxlength="100" required />
	</div>

	<div>
		<label for="description">Description</label>
		<input id="description" name="description" type="text" maxlength="255" />
	</div>

	<button>Save</button>
	<a href="/accounts">Cancel</a>
</form>
