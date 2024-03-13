/**
 * /posts
 * 所有分类下文章列表页面
 */

import { Title } from "@solidjs/meta";
import { ErrorBoundary } from "solid-js";
import MainBox from "~/components/layout/main/main-box";

import PostPageList from "~/components/pages/posts/post-page-list";

export default function PostsListPage() {

	return (
		<>
			<Title>博客 | 文章列表</Title>
			<MainBox>
				<div class='mx-8 md:mx-16 lg:mx-32 mt-16'>
					<p class='text-4xl mb-4'>文章列表</p>
					<ErrorBoundary fallback={<p class="font-error">{"加载出错了，你可以试试刷新页面 (っ °Д °;)っ "}</p>}>
						<PostPageList />
					</ErrorBoundary>
				</div>
			</MainBox>
		</>
	);
}
