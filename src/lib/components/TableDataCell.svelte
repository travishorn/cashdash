<script>
	export let muted = false;
	export let numeric = false;
</script>

<td
	class={`px-3 py-2 ${muted ? 'text-zinc-400 text-sm' : ''} ${numeric ? 'text-right font-mono' : ''}`}
	{...$$restProps}><slot /></td
>
