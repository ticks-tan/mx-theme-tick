import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";

import "~/styles/app.css";
import Header from "~/components/layout/header/header";
import Footer from "~/components/layout/footer/footer";
import type { AppFooter, AppNavItem } from "~/config/app";
import {
	Component,
	ErrorBoundary,
	ParentComponent,
	Suspense,
} from "solid-js";
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

const AppErrorPage: Component<{ error: string }> = (props) => {
	return (
		<div class='min-h-screen flex flex-col items-center justify-center'>
			<p class='text-3xl text-center text-error'>
				{"发生了一些错误，请刷新页面试试 ≧ ﹏ ≦ "}
			</p>
		</div>
	);
};

const AppContentLoading = () => {
	return (
		<div class='container flex-1 flex flex-col items-center justify-center'>
			<p class='text-3cl text-center'>加载中 . . .</p>
		</div>
	);
};

const App: ParentComponent = (props) => {

	return (
		<ErrorBoundary
			fallback={(err) => <AppErrorPage error={err.toString()} />}
		>
			<MetaProvider>
				<div class='min-h-screen flex flex-col'>
					<Header
						nav={demoHeaderNav}
						title='My Blog'
						className='sticky top-0 z-40 w-full'
					/>
					<Suspense fallback={<AppContentLoading />}>
						{props.children}
					</Suspense>
					<Footer
						config={demoFooterConf}
						className='footer mt-auto'
					/>
				</div>
			</MetaProvider>
		</ErrorBoundary>
	);
};

export default function MainApp() {
	return (
		<Router root={App} explicitLinks={true}>
			<FileRoutes />
		</Router>
	);
}
