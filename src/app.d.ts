// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

		interface Account {
			id: string;
			parentAccountId?: string;
			description?: string;
			depth?: number;
		}
	}
}

export {};
