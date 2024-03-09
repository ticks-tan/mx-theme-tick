/**
 * 主页最新文章组件
 */

import { Component, For, Show, Suspense } from "solid-js";
import { A, cache, createAsync } from "@solidjs/router";

import { MXApi } from "~/lib/request";
import { FormatData, cn } from "~/lib/utils";

const fetchRecentPostList = cache(async () => {
	"use server";
	return await MXApi.post.getList(1, 10, {
		sortBy: "created",
		sortOrder: -1,
	});
}, "request-home-post-list");


interface PostListProps {
	className?: string;
}

const PostList: Component<PostListProps> = ({ className }) => {

	const query = createAsync(() => fetchRecentPostList());

	return (
		<>
			<div class={cn("flex flex-col gap-2", className)}>
				<Suspense fallback={<p>Loading. . .</p>}>
					<Show when={query()}>
						<For each={query().data}>
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
							href='/posts'
							class='flex items-center justify-center hover:text-primary'
						>
							{/* 阅读更多 */}
							<h1>{"阅读更多"}</h1>
						</A>
					</Show>
				</Suspense>
			</div>
			<div></div>
		</>
	);
};

export default PostList;
