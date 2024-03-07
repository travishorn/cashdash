<script>
	import { indentation } from '$lib';

	/** @type {App.Account[]}*/
	export let accounts;

	/** @type {App.Account|null}*/
	export let account = null;

	const action = account ? '?/update' : '?/insert';
</script>

<form method="post" {action}>
	<div>
		<label for="parentAccountId">Parent account</label>
		<select id="parentAccountId" name="parentAccountId" required>
			{#each accounts as parentAccount}
				{#if !account || parentAccount.id !== account.id}
					<option
						value={parentAccount.id}
						selected={parentAccount.id === account?.parentAccountId || null}
						>{@html indentation(parentAccount.depth || 0)}{parentAccount.id}</option
					>
				{/if}
			{/each}
		</select>
	</div>

	<div>
		<label for="id">Name</label>
		<input id="id" name="id" type="text" maxlength="100" required value={account?.id || ''} />
	</div>

	<div>
		<label for="description">Description</label>
		<input
			id="description"
			name="description"
			type="text"
			maxlength="255"
			value={account?.description || ''}
		/>
	</div>

	<button>Save</button>
	<a href="/accounts">Cancel</a>
</form>
