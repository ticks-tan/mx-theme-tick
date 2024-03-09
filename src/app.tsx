import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { updateTheme } from "tailwind-material-colors/lib/updateTheme.esm";

import "~/styles/app.css";
import { useTheme } from "~/lib/theme";
import Header from "~/components/layout/header/header";
import Footer from "~/components/layout/footer/footer";
import type { AppFooter, AppNavItem } from "~/config/app";
import { ParentComponent, Suspense, onMount } from "solid-js";
import { generateRandomColor } from "./lib/utils";
import { FileRoutes } from "@solidjs/start/router";

const demoHeaderNav: AppNavItem[] = [
	{
		href: "/posts",
		text: "文章",
	},
	{
		href: "/notes",
		text: "随记",
	},
	{
		href: "/timeline",
		text: "归档",
	},
	{
		href: "/projects",
		text: "项目",
	},
];

const demoFooterNav: AppNavItem[] = [
	{
		href: "/feed",
		text: "RSS",
	},
	{
		href: "/friends",
		text: "友链",
	},
	{
		href: "/recently",
		text: "动态",
	},
	{
		href: "/about",
		text: "关于",
	},
];
const demoFooterConf: AppFooter = {
	nav: demoFooterNav,
	year: 2023,
	// other: "你好，我是页脚",
};

const App : ParentComponent = props => {

	onMount(() => {
		useTheme();
		const priamryColor = generateRandomColor();
		updateTheme({
			primary: priamryColor,
		}, "class");
	});

	return (
			<MetaProvider>
				<div class='min-h-screen flex flex-col'>
					<Header
						nav={demoHeaderNav}
						title='My Blog'
						className="sticky top-0 z-40 w-full"
					/>
					<Suspense>
						{props.children}
					</Suspense>
					<Footer config={demoFooterConf} className='footer mt-auto' />
				</div>
			</MetaProvider>
	);
};

export default function MainApp() {
	return (
		<Router root={App}>
			<FileRoutes />
		</Router>
	);
}
