<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h2>Payees</h2>

<a href="/payees/new">Add new payee</a>

<table>
	<thead>
		<tr>
			<th>Payee</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		{#each data.payees as payee}
			<tr>
				{#if payee.id === 'Opening Balances'}
					<td>{payee.id}</td>
				{:else}
					<td><a href={`/payees/${payee.id}`}>{payee.id}</a></td>
				{/if}
				<td>{payee.description || ''}</td>
			</tr>
		{/each}
	</tbody>
</table>
