module.exports = {
	plugins: {
		tailwindcss: {
			config: "./tailwind.config.js",
		},
		autoprefixer: {},
		"@fullhuman/postcss-purgecss": {
			content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
			defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
			safelist: {
				standard: [
					// /^bg-\[#1D1D1B\]/,
				],
			},
		},
	},
};
