import { A } from "@solidjs/router";
import { MetaProvider, Title } from "@solidjs/meta";

import { useTheme } from "~/lib/theme";
import Header from "~/components/layout/header/header";
import Footer from "~/components/layout/footer/footer";
import { AppFooter, AppHero, AppNavItem } from "~/config/app";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "~/lib/utils";

const demoNav: AppNavItem[] = [
	{
		href: "/",
		text: "主页",
	},
	{
		href: "/about",
		text: "关于",
	},
];
const demoFooterConf: AppFooter = {
	startYear: 2023,
	other: "你好，我是页脚",
};
const demoHeroConf: AppHero = {
	title: "嗨~",
	content: [
		{
			type: "span",
			text: "Hi, I'm ",
			style: "text-4xl",
		},
		{
			type: "span",
			text: "Ticks",
			style: "font-bold text-4xl",
		},
		{
			type: "br",
		},
		{
			type: "span",
			text: "A ",
			style: "text-4xl",
		},
		{
			type: "code",
			text: "Loser C++ <Developer />",
			style: "text-xl",
		},
	],
	contentStyle: "text-4xl",
	link: [
		{
			link: "https://github.com/ticks-tan",
			text: "Github",
		},
		{
			link: "",
			text: "BiliBili",
		},
	],
};

export default function Home() {
	const [theme, toggle] = useTheme();

	return (
		<MetaProvider>
			<Title>博客 | 主页</Title>
			<Header nav={demoNav} title='My Blog' className='shirk' />
			<main class='mx-auto bg-background w-full grow px-4'>
				<div class='mt-[120px] flex flex-col items-center sm:items-start'>
					{demoHeroConf.title && demoHeroConf.title.length && (
						<h1 class='max-6-xs text-5xl font-thin my-8'>
							{demoHeroConf.title}
						</h1>
					)}
					<div class='leading-4'>
						<For each={demoHeroConf.content}>
							{(it) => (
								<Dynamic
									component={it.type}
									class={cn(
										demoHeroConf.contentStyle,
										it.style
									)}
								>
									{it.text}
								</Dynamic>
							)}
						</For>
					</div>
					{demoHeroConf.link && demoHeroConf.link.length && (
						<div class='mt-8 lg:mt-[7rem]'>
							<h1>你也可以通过下面这些方式发现我：</h1>
							<ul class='flex items-center gap-4 mt-4 mx-[2rem]'>
								<For each={demoHeroConf.link}>
									{(it, idx) => (
										<>
											<li>
												<A
													href={it.link}
													target='_blank'
													class='underline hover:text-primary'
												>
													@{it.text}
												</A>
											</li>
											{idx() !=
												demoHeroConf.link.length -
													1 && <li>/</li>}
										</>
									)}
								</For>
							</ul>
						</div>
					)}
				</div>
			</main>
			<Footer nav={demoNav} config={demoFooterConf} className='shirk' />
		</MetaProvider>
	);
}
