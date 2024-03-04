/** @type {import('tailwindcss').Config} */

import { withMaterialColors } from "tailwind-material-colors";

const config = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
	darkMode: 'class',
};

module.exports = withMaterialColors(config, {
	primary: "#000000",
});
