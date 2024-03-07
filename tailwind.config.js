import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Roboto Flex Variable"', ...defaultTheme.fontFamily.sans],
				mono: ['"Roboto Mono Variable"', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: []
};
