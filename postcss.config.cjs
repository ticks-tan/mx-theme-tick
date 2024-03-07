module.exports = {
	purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	plugins: {
		'tailwindcss/nesting': {},
		tailwindcss: {},
		autoprefixer: {},
	},
	purge: ['./index.html', './src/**/*.{js, ts, jsx, tsx}'],
};
