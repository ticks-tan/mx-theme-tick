import type { Config } from 'tailwindcss';
import { withMaterialColors } from "tailwind-material-colors";

const twConfig : Config = {
	theme: {
		extend: {
			keyframes: {
				bSlideIn: {
					"0%": {
						transform: "scaleX(0.8) scaleY(0.6) translateY(20px)"
					},
					"100%": {
						transform: "scaleX(1) scaleY(1) translateY(0px)"
					}
				}
			},
			animation: {
				"bSlideIn": "bSideIn .4s linear"
			}
		},
	},
	plugins: [
		require('tailwind-scrollbar')({nocompatible: true }),
	],
	darkMode: 'class',
	content: {
		relative: true,
		files: [
			'./src/*.{html,js}',
			"./index.html",
			"./src/**/*.{html,js,jsx,ts,tsx, scss}",
		],
	},
};

const config =  withMaterialColors(twConfig, {
	primary: "#000000",
});

export default config;
