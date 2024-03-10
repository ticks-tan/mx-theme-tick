/**
 * 文章详情，用于渲染Markdown
 */

import {
	Component,
	For,
	Show,
	Suspense,
	createMemo,
} from "solid-js";
import { unified } from "unified";
import gfmPlugin from "remark-gfm";
import remarkParser from "remark-parse";
import rehypePlugin from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import katexPlugin from "rehype-katex";
import { Link } from "@solidjs/meta";
import { createAsyncMemo, useMounted } from "solidjs-use";
import { A } from "@solidjs/router";
import type { ModelWithLiked, PostModel } from "@mx-space/api-client";
// import Heti from "heti/js/heti-addon";

import { useTheme } from "~/lib/theme";
import { genHtmlAnchor } from "~/lib/toc";
import { FormatData, cn } from "~/lib/utils";
import { Eye, FileDir, Pen, Tag, Time, Warnning } from "~/components/ui/icon";

import "~/styles/post-detail.scss";

interface PostDetailProps {
	info: ModelWithLiked<PostModel>;
	className?: string;
}

async function processMarkdown(md: string) {
	if (!md.length) {
		return "";
	}
	try {
		// 处理Markdown文件并生成html页面
		const html = await unified()
			.use(remarkParser)
			.use(gfmPlugin)
			.use(katexPlugin)
			.use(rehypePlugin)
			.use(rehypeStringify)
			.use(rehypeHighlight)
			.process(md);
		// 处理html页面锚点
		return await genHtmlAnchor(String(html));
	} catch (e) {
		console.log(`parse markdown error: ${e}`);
		return "";
	}
}

const PostDetail: Component<PostDetailProps> = ({ className, info }) => {
	const isMounted = useMounted();
	const [theme] = useTheme();

	// 异步处理Markdown
	const htmlFile = createAsyncMemo(async () => {
		return await processMarkdown(info.text);
	});

	// 文章是否过期
	const postOld = createMemo(() => {
		const now = new Date();
		const old = new Date(info.modified);
		// >= 6月提示
		const month =
			now.getFullYear() > old.getFullYear()
				? 7
				: now.getMonth() - old.getMonth();
		return month >= 6;
	});

	return (
		<>
			{/* 等待组件挂载后引入样式文件 */}
			<Suspense>
				{isMounted() && (
					<>
						{/* Katex样式 */}
						<Link
							rel='stylesheet'
							media='print'
							onLoad={(e) => {
								const link = e.target as HTMLLinkElement;
								link.media = "all";
								link.onload = null;
							}}
							href='//cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css'
						/>
						{/* 根据当前主题模式，引入代码块样式文件 */}
						<Show when={theme() == "light"}>
							<Link
								rel='stylesheet'
								media='all'
								href='//cdn.jsdelivr.net/npm/@catppuccin/highlightjs@0.1.4/css/catppuccin-latte.css'
							/>
						</Show>
						<Show when={theme() == "dark"}>
							<Link
								rel='stylesheet'
								media='all'
								href='//cdn.jsdelivr.net/npm/@catppuccin/highlightjs@0.1.4/css/catppuccin-mocha.css'
							/>
						</Show>
					</>
				)}
			</Suspense>
			<div class={cn("", className)}>
				<div class='mx-auto w-full min-w-0'>
					{/* 文章标题 */}
					<p class='text-5xl text-center'>{info.title}</p>
					{/* 文章相关信息 */}
					<div class='flex items-center justify-center gap-4 mt-8'>
						{/* 文章发布时间 */}
						<div class='inline-flex items-center justify-center'>
							<Time class='h-4 w-4 mr-2' />
							<time>{FormatData(info.created)}</time>
						</div>
						{/* 文章修改时间 */}
						<div class='inline-flex items-center justify-center'>
							<Pen class='h-4 w-4 mr-2' />
							<time>{FormatData(info.modified)}</time>
						</div>
						{/* 文章观看数 */}
						<div class='inline-flex items-center justify-center'>
							<Eye class='h-4 w-4 mr-2' />
							<span>{info.count.read}</span>
						</div>
					</div>
					{/* 标签与分类信息 */}
					<div class='flex flex-wrap items-center justify-center gap-4 mt-4 mb-32'>
						{/* 分类 */}
						<div class='inline-flex items-center justify-center'>
							<FileDir class='h-4 w-4 mr-2' />
							<span>
								<A href={`/category/${info.category.slug}/`}>
									{info.category.name}
								</A>
							</span>
						</div>
						{/* 标签 */}
						<Show when={info.tags.length}>
							<div class='inline-flex items-center justify-center'>
								<Tag class='w-4 h-4 mr-2' />
								<For each={info.tags}>
									{(tag) => (
										<span>
											<A href={`/tags/${tag}`}>{tag}</A>
										</span>
									)}
								</For>
							</div>
						</Show>
					</div>
					{/* 过时提醒 */}
					<Show when={postOld()}>
						<OldNotice oldDate={FormatData(info.modified)} />
					</Show>
					{/* 文章内容 */}
					<div
						id='markdown-show-box'
						class='heti'
						innerHTML={htmlFile()}
					></div>
				</div>
			</div>
		</>
	);
};

// 过期提示组件
interface OldNoticeProps {
	// 旧时间
	oldDate: string;
}

const OldNotice: Component<OldNoticeProps> = ({ oldDate }) => {
	return (
		<blockquote
			class={cn(
				"my-4 mx-auto py-[20px] px-[15px] bg-error/60 rounded border-l-4 border-l-error",
				"relative transition-all duration-200 grid grid-cols-[36px_1fr] items-center",
				"md:mx-16",
				"before:content-none"
			)}
		>
			<Warnning class='w-8 h-8 mr-2' />
			{`本文最后修改于 ${oldDate} ，其中信息可能已经过时，请酌情参考！`}
		</blockquote>
	);
};

export default PostDetail;
