/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

// const dynamicClassList = Array.from({ length: 5 }, (_, i) => `class-${i + 1}`);

module.exports = {
	important: true,
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	future: {
		hoverOnlyWhenSupported: true,
	},
	theme: {
		extend: {
			spacing: {
				topbar: '10dvh',
				container: 'min(1160px, 100% - 2rem)',
				'15': '3.75rem',
				'full-min-7': 'calc(100% - 1.75rem)',
				'full-min-9': 'calc(100% - 2.25rem)',
				'full-min-32px': 'calc(100% - 32px)',
			},
			maxWidth: {
				'2/3': '66.6666666667%',
			},
			minHeight: {
				content: '82.5dvh',
			},
			padding: {
				content: '10dvh',
				'content-plus-4': 'calc(10dvh + 1rem)',
			},
			height: {
				footer: '17.5dvh',
			},
			colors: {
				dark: {
					50: '#e6edf3',
					100: '#e3e9fb',
					200: '#c1d3f6',
					300: '#8aaeef',
					400: '#4c85e4',
					500: '#2566d2',
					600: '#164cb3',
					700: '#133c91',
					800: '#30363d',
					900: '#0e1116',
					950: '#020409',
				},
				
			},
			fontFamily: {
				display: ["var(--font-sf)", "system-ui", "sans-serif"],
				default: ["var(--font-blinker)", "system-ui", "sans-serif"],
			},

			animation: {
				'fade': "fade 0.75s cubic-bezier(.53, .28, .26,1)",
				'fade-up': 'fade-up 0.75s cubic-bezier(.53, .28, .26,1)',
			},
			keyframes: {
				fade: {
					"0%": {
						opacity: 1,
						transform: "translateY(100px)"
					},
					"40%": {
						transform: "translateY(-40px)"
					},
					"100%": {
						transform: "translateY(0px)"
					},
				},
				'fade-up': {
					'0%': {
						opacity: 1,
						transform: 'translateY(0)',
					},
					'100%': {
						opacity: 1,
						transform: 'translateY(-100%)',
					},
				}
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		plugin(({ addVariant }) => {
			addVariant("radix-side-top", '&[data-side="top"]');
			addVariant("radix-side-bottom", '&[data-side="bottom"]');
		}),
	],
	// safelist: [
	// 	...dynamicClassList
	// ],
};
