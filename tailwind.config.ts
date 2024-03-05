import type { Config } from 'tailwindcss';
import { withMaterialColors } from "tailwind-material-colors";

const twConfig : Config = {
	content: [
		"./index.html",
		"./src/**/*.{html,js,jsx,ts,tsx, scss}"
	],
	theme: {
		extend: {},
	},
	plugins: [],
	darkMode: 'class',
};

const config =  withMaterialColors(twConfig, {
	primary: "#000000",
});

export default config;
