/**
 * 文章列表项组件
 */

import { PostModel } from "@mx-space/api-client";
import { Component } from "solid-js";

import Card from "~/components/ui/card";
import { Eye, FileDir, Time } from "~/components/ui/icon";
import { FormatData, cn } from "~/lib/utils";

interface PostItemProps {
	post: PostModel,
	className?: string,
}

const PostItem: Component<PostItemProps> = ({ post, className }) => {
	return (
		<article class={cn("", className)}>
			<Card
				link={{
					href: `/posts/${post.category.slug}/${post.slug}`,
					external: false,
				}}
				className={cn("grid grid-cols-1 gap-2")}
			>
				<h1 class={cn("text-lg")}>{post.title}</h1>
				<h1 class='text-on-background/60 py-1'>{`${post.text} ...`}</h1>
				<div class='flex items-center gap-4 text-sm text-outline'>
					{/* 时间 */}
					<div class='flex items-center'>
						<Time className='w-4 h-4 mr-1' />
						<time>{FormatData(post.modified)}</time>
					</div>
					{/* 分类 */}
					<div class='flex items-center'>
						<FileDir className='w-4 h-4 mr-1' />
						<span>{post.category.name}</span>
					</div>
					{/* 观看数 */}
					<div class="flex items-center">
						<Eye className="w-4 h-4 mr-1"/>
						<span>{post.count.read}</span>
					</div>
				</div>
			</Card>
		</article>
	);
};

export default PostItem;
