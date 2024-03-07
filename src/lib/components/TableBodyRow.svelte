<script>
	export let i = 0;
</script>

<tr class={i % 2 === 0 ? 'bg-zinc-200/5' : ''}>
	<slot />
</tr>
