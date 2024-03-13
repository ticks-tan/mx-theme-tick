import { useUrlSearchParams } from "solidjs-use";
import { cache, createAsync } from "@solidjs/router";
import { createMemo, Show, For, Suspense } from "solid-js";

import { MXApi } from "~/lib/request";
import { cn, mdSummary } from "~/lib/utils";
import PostItem from "~/components/pages/posts/post-item";

interface PostsPageUrlParams {
	page?: number;
}

const fetchPagePostList = cache(async (page: number, limit: number) => {
	return await MXApi.post.getList(page, limit, {
		sortBy: "modified",
		sortOrder: -1,
	});
}, "request-post-list");

export default function PostPageList() {
	// 读取URL参数
	const [params, setParams] =
		useUrlSearchParams<PostsPageUrlParams>("hash-params");
	// 当前分页数
	const page = createMemo(() => params().page || 1);

	const postQuery = createAsync(() => fetchPagePostList(page(), 10));

	const postData = createMemo(() => {
		return postQuery() && postQuery().data
			? postQuery().data.map((v) => {
					return { ...v, text: mdSummary(v.text) };
			  })
			: [];
	});

	const NextPage = () => {
		setParams({
			page: page() + 1,
		});
	};
	const PrevPage = () => {
		setParams({
			page: page() - 1,
		});
	};

	return (
		<>
			<Suspense fallback={<div class='text-xl mt-8'>加载中 (✿◠‿◠)</div>}>
				<h1 class='text-xl mb-8'>{`当前共有 ${
					postQuery()?.pagination.total
				} 篇文章，稳定发挥中`}</h1>
				<ul class='grid grid-cols-1 gap-8'>
					<Suspense>
						<For each={postData()}>
							{(post, idx) => {
								return (
									<li>
										<PostItem post={post} className='p-2' />
									</li>
								);
							}}
						</For>
					</Suspense>
					<li class='relative p-4'>
						{postQuery()?.pagination.hasPrevPage && (
							<button
								onClick={PrevPage}
								class='float-start text-lg underline transition hover:text-primary'
							>
								上一页
							</button>
						)}
						{postQuery()?.pagination.hasNextPage && (
							<button
								onClick={NextPage}
								class='float-end text-lg underline transition hover:text-primary'
							>
								下一页
							</button>
						)}
					</li>
				</ul>
				{/* </Show> */}
			</Suspense>
		</>
	);
}
