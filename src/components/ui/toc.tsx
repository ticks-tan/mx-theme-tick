/**
 * 目录组件
 */

import { createAsync } from "@solidjs/router";
import {
	Component,
	For,
	Suspense,
} from "solid-js";

import { TableOfContents, getTableOfContents } from "~/lib/toc";
import { cn } from "~/lib/utils";

interface TocProps {
	tocText: string;
	className?: string;
}

const Toc: Component<TocProps> = ({ tocText, className }) => {

	const toc = createAsync(() => getTableOfContents(tocText));

	return (
		<div class={cn("space-y-2", className)}>
			<p class='font-bold text-lg'>目录</p>
			<Suspense fallback={<p>解析中. . .</p>}>
				<Tree tree={toc() } />
			</Suspense>
		</div>
	);
};

interface TreeProps {
	tree: TableOfContents,
	level?: number,
}

function Tree({ tree, level = 1 }: TreeProps) {
	return tree?.items?.length && level < 3 ? (
		<ul class={cn("m-0 list-none", { "pl-4": level !== 1 })}>
			<For each={tree.items}>
				{(item) => {
					return (
						<li class={cn("mt-0 pt-2")}>
							<a
								href={item.url}
								class={cn(
									"inline-block no-underline text-sm",
									"hover:font-bold hover:text-primary"
								)}
							>
								{item.title}
							</a>
							{item.items?.length ? (
								<Tree
									tree={item}
									level={level + 1}
								/>
							) : null}
						</li>
					);
				}}
			</For>
		</ul>
	) : null;
}

export default Toc;
