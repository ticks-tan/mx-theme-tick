import { MetaProvider } from "@solidjs/meta";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import routes from "~solid-pages";
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'

import "~/styles/app.css";
import { useTheme } from "~/lib/theme";
import Header from "~/components/layout/header/header";
import Footer from "~/components/layout/footer/footer";
import type { AppFooter, AppNavItem } from "~/config/app";
import { ParentComponent, onMount } from "solid-js";

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

const queryClient =  new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 30* 1000,
			gcTime: 30* 1000,
		},
	},
});

const App : ParentComponent = props => {

	onMount(() => {
		useTheme();
	});

	return (
		<QueryClientProvider client={queryClient}>
			<SolidQueryDevtools initialIsOpen={true} position="right"/>
			<MetaProvider>
				<div class='h-screen max-w-screen overflow-x-hidden flex flex-col gap-4 px-4 md:px-8 lg:px-32'>
					<Header
						nav={demoHeaderNav}
						title='My Blog'
						className='shirk'
					/>
					{props.children}
					<Footer config={demoFooterConf} className='shirk footer mt-auto' />
				</div>
			</MetaProvider>
		</QueryClientProvider>
	);
};

export default App;

render(() => {
	return (
		<Router root={App}>
			{routes}
		</Router>
	)
}, document.body);
