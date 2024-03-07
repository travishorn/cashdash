<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h2>Commodities</h2>

<a href="/commodities/new">Add new commodity</a>

<table>
	<thead>
		<tr>
			<th>Commodity</th>
			<th>Decimal Factor</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		{#each data.commodities as commodity}
			<tr>
				<td><a href={`/commodities/${commodity.id}`}>{commodity.id}</a></td>
				<td>{commodity.decimalFactor}</td>
				<td>{commodity.description || ''}</td>
			</tr>
		{/each}
	</tbody>
</table>
