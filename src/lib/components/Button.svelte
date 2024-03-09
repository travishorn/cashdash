<script>
	/** @type {string|null} */
	export let href = null;
	export let type = 'primary';
	let colors = '';

	const padding = href ? 'px-2 py-1.5' : 'px-2 py-1';

	switch (type) {
		case 'secondary':
			colors = 'border border-lime-400 hover:bg-lime-300 text-lime-400 hover:text-zinc-900';
			break;
		case 'danger':
			colors = 'border border-red-400 hover:bg-red-300 text-red-400 hover:text-zinc-900';
			break;
		default:
			colors = 'bg-lime-400 hover:bg-lime-300 text-zinc-900';
	}

	const className = `rounded shadow ${padding} ${colors}`;
</script>

{#if href}
	<a class={className} {href}><slot /></a>
{:else}
	<button class={className}><slot /></button>
{/if}
