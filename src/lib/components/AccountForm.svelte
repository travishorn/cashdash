<script>
	import { indentation } from '$lib';

	/** @type {App.Account[]}*/
	export let accounts;
</script>

<form method="post">
	<div>
		<label for="parentAccountId">Parent account</label>
		<select id="parentAccountId" name="parentAccountId">
			<option value="" style="font-style:italic">None (top-level)</option>
			{#each accounts as account}
				<option value={account.id}>{@html indentation(account.depth || 0)}{account.id}</option>
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
