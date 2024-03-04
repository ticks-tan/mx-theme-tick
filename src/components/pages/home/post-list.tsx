/**
 * 主页最新文章组件
 */

import { Component, For, Match, Switch } from "solid-js";
import {
	QueryClient,
	QueryClientProvider,
	createQuery,
} from "@tanstack/solid-query";
import { MXApi } from "~/lib/request";
import { FormatData } from "~/lib/utils";
import { A } from "@solidjs/router";

const queryClient = new QueryClient();

async function fetchRecentPostList() {
	return await MXApi.post.getList(1, 10);
}

interface PostListProps {
	className?: string;
}

const RecentPostList: Component<PostListProps> = ({ className }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<PostList className={className} />
		</QueryClientProvider>
	);
};

const PostList: Component<PostListProps> = ({ className }) => {
	const query = createQuery(() => ({
		queryKey: ["home-recent-post-list"],
		queryFn: fetchRecentPostList,
	}));

	return (
		<div class="flex flex-col gap-2">
			<Switch>
				<Match when={query.isLoading}>
					{/* 数据加载中 */}
					<p></p>
				</Match>
				<Match when={query.isError}>
					{/* 数据请求失败 */}
					<p></p>
				</Match>
				<Match when={query.isSuccess}>
					{/* 数据加载成功 */}
					<For each={query.data?.data}>
						{(post) => (
							<A
								href={`/posts/${post.category.slug}/${post.slug}`}
								class='flex items-center justify-between border-b hover:border-b-2 border-dashed hover:border-primary'
							>
								{/* 标题 */}
								<h1>{post.title}</h1>
								<time>{FormatData(post.created)}</time>
							</A>
						)}
					</For>
					<A 
						href="/posts"
						class="flex items-center justify-center hover:text-primary"
					>
						{/* 阅读更多 */}
						<h1>{"阅读更多"}</h1>
					</A>
				</Match>
			</Switch>
		</div>
	);
};

export default RecentPostList;
