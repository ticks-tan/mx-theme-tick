/**
 * /posts/:category/:slug
 * 文章详情页面
 */

import { Title } from "@solidjs/meta";
import { A, useParams, useLocation } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { For, Show, createMemo, lazy } from "solid-js";
import { createAsyncMemo, useClipboard } from "solidjs-use";

import MainBox from "~/components/layout/main/main-box";
import HorizontalDivider from "~/components/ui/horizontal-divider";
import { MXApi } from "~/lib/request";
import { getTableOfContents } from "~/lib/toc";

// 异步导入Markdown组件和目录组件
const MDPostShow = lazy(() => import("~/components/pages/posts/post-detail"));
const MDToc = lazy(() => import("~/components/ui/toc"));

type ParamsType = {
	category: string;
	slug: string;
};

async function fetchPostDetail(category: string, slug: string) {
	// 请求博客文件
	return await MXApi.post.getPost(category, slug);
}

export default function PostDetailPage() {
	const params = useParams<ParamsType>();

	const postQuery = createQuery(() => ({
		queryKey: ["post-detail", params.category, params.slug],
		queryFn: () => fetchPostDetail(params.category, params.slug),
		staleTime: 60 * 1000,
		gcTime: 60 * 1000,
	}));

	// 异步处理目录组件
	const tocItems = createAsyncMemo(async () => {
		return await getTableOfContents(postQuery.data.text);
	}, null);
	// 文章链接信息
	const postLink = createMemo(() => `${window.location.href}`);
	const { text, copy, copied, isSupported } = useClipboard({
		source: postLink,
	});

	return (
		<>
			<Title>博客 | 文章详情</Title>
			<MainBox>
				<Show when={postQuery.isFetching || postQuery.isLoading}>
					{/* 加载中 */}
					<h1 class="w-full text-center text-4xl mt-8">加载中 (✿◠‿◠) </h1>
				</Show>
				<main class='relative py-6 lg:gap-10 lg:py-10 lg:grid lg:grid-cols-[1fr_240px]'>
					{/* 文章详情 */}
					<Show when={!postQuery.isError && postQuery.data}>
						<MDPostShow
							info={postQuery.data}
							className='mx-auto w-full min-w-0 px-2 md:px-8'
						/>
					</Show>
					{/* 目录 */}
					<div class='hidden text-sm lg:block'>
						<div class='sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10'>
							<Show when={tocItems() != null}>
								<MDToc toc={tocItems()} />
							</Show>
						</div>
					</div>
				</main>
				{/* 相关阅读 */}
				<Show when={postQuery.data && postQuery.data.related.length}>
					<div class='mt-8 mx-8'>
						<p class='text-lg font-bold'>相关阅读</p>
						<ul class='list-disc'>
							<For each={postQuery.data.related}>
								{(item) => (
									<li class='ml-8 underline'>
										<A
											href={`/posts/${item.category.slug}/${item.slug}`}
										>
											{item.title}
										</A>
									</li>
								)}
							</For>
						</ul>
					</div>
				</Show>
				<Show when={postQuery.data}>
					<HorizontalDivider className='mt-8 mb-4'>
						我是分割线
					</HorizontalDivider>
					{/* 其他信息 */}
					<div class='mx-8 text-sm'>
						{/* 文章链接以及分享 */}
						<div class='flex flex-wrap items-center'>
							{isSupported() ? (
								<>
									<span>文章链接：</span>
									<button
										class='bg-background-press px-2 rounded'
										onClick={() => copy(postLink())}
									>
										点我复制
									</button>
								</>
							) : (
								<span>{`文章链接：${postLink()}`}</span>
							)}
						</div>
						{/* 版权信息 */}
						<Show when={postQuery.data.copyright}>
							<div class='py-2'>
								<span>版权说明：</span>
								<span>
									商业转载请联系站长获得授权，非商业转载请注明本文出处及文章链接，您可以自由地在任何媒体以任何形式复制和分发作品，也可以修改和创作，但是分发衍生作品时必须采用相同的许可协议。
								</span>
								<p>
									本文采用
									<A
										href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh'
										target='_blank'
										class='hover:underline hover:font-bold'
									>
										知识共享署名 - 非商业性使用 -
										相同方式共享 4.0 国际许可协议
									</A>
									进行许可。
								</p>
							</div>
						</Show>
					</div>
				</Show>
				{/* 评论 todo */}
			</MainBox>
		</>
	);
}
