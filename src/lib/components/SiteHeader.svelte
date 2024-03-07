<script>
	import { page } from '$app/stores';
	$: section = `/${$page.url.pathname.split('/')[1]}`;

	const links = [
		{ url: '/accounts', text: 'Accounts' },
		{ url: '/commodities', text: 'Commodities' },
		{ url: '/payees', text: 'Payees' },
		{ url: '/transactions', text: 'Transactions' }
	];
</script>

<header class="flex items-center gap-16">
	<a class="flex items-center gap-2" href="/">
		<img class="h-9 w-9" alt="An illustration of banknotes" src="/banknotes.svg" />
		<h1 class="text-xl">CashDash</h1>
	</a>
	<nav class="flex gap-8">
		{#each links as link}
			<a
				class={`${section === link.url ? 'text-lime-300 bg-zinc-200/5' : ''} px-4 py-1 rounded-md hover:bg-zinc-200/5`}
				href={link.url}>{link.text}</a
			>
		{/each}
	</nav>
</header>
