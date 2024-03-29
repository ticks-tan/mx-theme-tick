/**
 * /posts/:category/:slug
 * 文章详情页面
 */

import { Title } from "@solidjs/meta";
import {
	A,
	cache,
	createAsync,
	RouteDefinition,
	useParams,
} from "@solidjs/router";
import {
	ErrorBoundary,
	For,
	Show,
	createSignal,
	lazy,
} from "solid-js";
import { useClipboard, useBrowserLocation } from "solidjs-use";

import MainBox from "~/components/layout/main/main-box";
import HorizontalDivider from "~/components/ui/horizontal-divider";
// 异步导入Markdown组件和目录组件
const MDPostShow = lazy(() => import("~/components/pages/posts/post-detail"));
import MDToc from "~/components/ui/toc";

import { MXApi } from "~/lib/request";

const fetchPostDetail = cache(async (category: string, slug: string) => {
	// 请求博客文件
	console.log(`getPost: ${category}/${slug}`);
	return await MXApi.post.getPost(category, slug);
}, "request-post-detail");

type ParamsType = {
	category: string;
	slug: string;
};

export const router = {
	load({ params: { category, slug } }) {
		fetchPostDetail(category, slug);
	},
} satisfies RouteDefinition;

export default function PostDetailPage() {
	// 文章链接信息
	const [params] = createSignal<ParamsType>(useParams());
	const location = useBrowserLocation();


	const postQuery = createAsync(
		() => fetchPostDetail(params().category, params().slug)
	);

	const { text : postLink, copy } = useClipboard({
		source: location.href,
	});

	return (
		<>
			<Title>博客 | 文章详情</Title>
			<MainBox>
				<ErrorBoundary fallback={<p>加载失败！</p>}>
					<Show when={postQuery()}>
						<main class='relative py-6 lg:gap-10 lg:py-10 lg:grid lg:grid-cols-[1fr_240px]'>
							{/* 文章详情 */}
							<MDPostShow
								info={postQuery()}
								className='mx-auto w-full min-w-0 px-2 md:px-6'
							/>
							{/* 目录 */}
							<div class='hidden text-sm lg:block'>
								<ErrorBoundary fallback>
									<div class='sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10'>
										<MDToc tocText={postQuery().text}/>
									</div>
								</ErrorBoundary>
							</div>
						</main>
						{/* 相关阅读 */}
						<Show when={postQuery().related.length}>
							<div class='mt-8 mx-8'>
								<p class='text-lg font-bold'>相关阅读</p>
								<ul class='list-disc'>
									<For each={postQuery().related}>
										{(item) => (
											<li class='ml-8 underline'>
												<a
													href={`/posts/${item.category.slug}/${item.slug}`}
												>
													{item.title}
												</a>
											</li>
										)}
									</For>
								</ul>
							</div>
						</Show>
						<HorizontalDivider className='mt-8 mb-4'>
							我是分割线
						</HorizontalDivider>
						{/* 其他信息 */}
						<div class='mx-8 text-sm'>
							{/* 文章链接以及分享 */}
							<div class='flex flex-wrap items-center'>
								<ErrorBoundary
									fallback={
										<span>{`文章链接：${postLink()}`}</span>
									}
								>
									<div>
										<span>文章链接：</span>
										<button
											class='bg-background-press px-2 rounded'
											onClick={() => copy(postLink())}
										>
											点我复制
										</button>
									</div>
								</ErrorBoundary>
							</div>
							{/* 版权信息 */}
							<Show when={postQuery().copyright}>
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
						<div></div>
					</Show>
				</ErrorBoundary>
				{/* 评论 todo */}
			</MainBox>
		</>
	);
}
