/**
 * 文章详情，用于渲染Markdown
 */

import { Component, Show, createEffect } from "solid-js";
import { unified } from "unified";
import gfmPlugin from "remark-gfm";
import remarkParser from "remark-parse";
import rehypePlugin from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import katexPlugin from "rehype-katex";
import codeTitlePlugin from "remark-code-title";
import { Link } from "@solidjs/meta";
import { useMounted } from "solidjs-use";
import { createAsync } from "@solidjs/router";
import { useTheme } from "~/lib/theme";


interface PostDetailProps {
	markdown: string;
}

async function processMarkdown(md: string) {
	return await unified()
		.use(remarkParser)
		.use(rehypePlugin)
		.use(rehypeStringify)
		.use(gfmPlugin)
		.use(codeTitlePlugin)
		.use(rehypeHighlight)
		.use(katexPlugin)
		.process(md);
}

const PostDetail: Component<PostDetailProps> = ({ markdown }) => {
	const isMounted = useMounted();
	const [theme] = useTheme();

    const htmlFile = createAsync(async () => {
        return await processMarkdown(markdown);
    });

    let mdBox : HTMLElement | undefined;

    createEffect(() => {
        if (mdBox != undefined && htmlFile()) {
            mdBox.innerHTML = String(htmlFile());
        }
    });

	return (
		<>
			{isMounted() && (
				<>
				<Link
					rel='stylesheet'
					media='print'
					onLoad={(e) => {
						const link = e.target as HTMLLinkElement;
						link.media = "all";
						link.onload = null;
					}}
					href='https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
				/>
				<Show when={theme() == "light"}>
					<Link rel="stylesheet" media="all" href="//cdn.jsdelivr.net/npm/@catppuccin/highlightjs@0.1.4/css/catppuccin-latte.css"/>
				</Show>
				<Show when={theme() == "dark"}>
					<Link rel="stylesheet" media="all" href="//cdn.jsdelivr.net/npm/@catppuccin/highlightjs@0.1.4/css/catppuccin-mocha.css"/>
				</Show>
				<Link rel="stylesheet" media="all" href="/style/post-detail.css"/>
				</>
			)}
			<main id='markdown-show-box' ref={mdBox}></main>
		</>
	);
};

export default PostDetail;