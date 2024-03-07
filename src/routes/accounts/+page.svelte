<script>
	import { indentation } from '$lib';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h2>Accounts</h2>

<a href="/accounts/new">Add new account</a>

<table>
	<thead>
		<tr>
			<th>Account</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		{#each data.accounts as account}
			<tr>
				<td>{@html indentation(account.depth || 0)}{account.id}</td>
				<td>{account.description || ''}</td>
			</tr>
		{/each}
	</tbody>
</table>
