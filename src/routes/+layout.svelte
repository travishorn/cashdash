<script>
	import '@fontsource-variable/roboto-flex';
	import '@fontsource-variable/roboto-mono';
	import '../app.css';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
</script>

<svelte:head>
	<title>CashDash</title>
	<link rel="icon" href="/banknotes-dark.svg" />
</svelte:head>

<div class="min-h-screen bg-zinc-900 text-zinc-200">
	<div class="container mx-auto pt-10 pb-64 flex flex-col gap-6">
		<SiteHeader />
		<main>
			<slot />
		</main>
	</div>
</div>
