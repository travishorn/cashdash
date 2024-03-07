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
			path?: string;
		}

		interface Commodity {
			id: string;
			decimalFactor: number;
			description?: string;
		}

		interface Payee {
			id: string;
			description?: string;
		}
	}
}

export {};
