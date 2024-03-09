// import solidPlugin from "vite-plugin-solid";
import pagePlugin from "vite-plugin-pages";
import vercel from "solid-start-vercel";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	plugins: [
		pagePlugin({
			dirs: [{ dir: "./src/pages", baseRoute: "" }],
			routeStyle: "next",
			resolver: "solid",
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	resolve: {
		alias: {
			"~": resolve(__dirname, "./src/"),
		},
	},
});
