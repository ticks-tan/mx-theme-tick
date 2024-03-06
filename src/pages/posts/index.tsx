/**
 * /posts
 * 所有分类下文章列表页面
 */

import { Title } from "@solidjs/meta";
import { createQuery } from "@tanstack/solid-query";
import { createMemo, createSignal, Show, For } from "solid-js";

import { MXApi } from "~/lib/request";
import PostItem from "~/components/pages/posts/post-item";
import { cn, mdSummary } from "~/lib/utils";
import MainBox from "~/components/layout/main/main-box";

async function fetchPagePostList(page: number, limit: number) {
	return await MXApi.post.getList(page, limit, {
		sortBy: "modified",
		sortOrder: -1,
	});
}

const Loading = () => {
	return <div class="text-xl mt-8">加载中 (✿◠‿◠)</div>;
};

export default function PostsListPage() {
	// 当前分页数
	const [page, setPage] = createSignal<number>(1);

	const postQuery = createQuery(() => ({
		queryKey: ["post-page-list", "sort-modify", page()],
		queryFn: () => fetchPagePostList(page(), 10),
		// deferStream: true,
		gcTime: 60 * 1000,
		staleTime: 60 * 1000,
	}));

	const postData = createMemo(() => {
		return !postQuery.isError && !postQuery.isLoading && postQuery.data
			? postQuery.data.data.map((v) => {
					return { ...v, text: mdSummary(v.text) };
			  })
			: [];
	});

	const nextPage = () => {
		setPage(page() + 1);
	};
	const prevPage = () => {
		setPage(page() - 1);
	};

	return (
		<>
			<Title>博客 | 文章列表</Title>
			<MainBox>
				<div class='mx-8 md:mx-16 lg:mx-32 mt-16'>
					<p class='text-4xl mb-4'>文章列表</p>
					<Show when={!postQuery.isError && postQuery.data}>
						<h1 class='text-xl mb-8'>{`当前共有 ${postQuery.data.pagination.total} 篇文章，稳定发挥中`}</h1>
						<ul class='grid grid-cols-1 gap-8'>
							<For each={postData()}>
								{(post, idx) => {
									return (
										<li>
											<PostItem post={post} className="p-2"/>
										</li>
									);
								}}
							</For>
							{postData().length && (
								<li class='relative p-4'>
									{postQuery.data.pagination.hasPrevPage && (
										<button
											onClick={prevPage}
											class='float-start text-lg underline transition hover:text-primary'
										>
											上一页
										</button>
									)}
									{postQuery.data.pagination.hasNextPage && (
										<button
											onClick={nextPage}
											class='float-end text-lg underline transition hover:text-primary'
										>
											下一页
										</button>
									)}
								</li>
							)}
						</ul>
					</Show>
					<Show when={postQuery.isError}>
						<h1 class='mt-4 text-lg'>
							似乎发生了一些问题，
							<button
								onClick={() => postQuery.refetch}
								class='underline text-error'
							>
								点我重新获取
							</button>
						</h1>
					</Show>
					<Show when={postQuery.isFetching}>
						<Loading />
					</Show>
				</div>
			</MainBox>
		</>
	);
}
