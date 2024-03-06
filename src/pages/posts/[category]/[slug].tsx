/**
 * /posts/:category/:slug
 * 文章详情页面
 */

import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { Show } from "solid-js";

import MainBox from "~/components/layout/main/main-box";
import MDPostShow from "~/components/pages/posts/post-detail";
import { MXApi } from "~/lib/request";

type ParamsType = {
    category: string,
    slug: string,
};

async function fetchPostDetail(category: string, slug: string) {
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

	return (
		<>
            <Title>博客 | 文章详情</Title>
			<MainBox>
                {/* 目录 */}
                {/* 文章详情 */}
                <Show when={!postQuery.isError && postQuery.data}>
                    <MDPostShow markdown={postQuery.data.text}/>
                </Show>
                {/* 文章底部信息 */}
                {/* 评论 */}
            </MainBox>
		</>
	);
}
