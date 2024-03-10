/**
 * 目录组件
 */

import {
	Accessor,
	Component,
	For,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
} from "solid-js";

import { TableOfContents } from "~/lib/toc";
import { cn } from "~/lib/utils";

interface TocProps {
	toc: TableOfContents;
	className?: string;
}

const Toc: Component<TocProps> = ({ toc, className }) => {
	const [activeId, setActiveId] = createSignal<string>("");

	const itemIds = createMemo(() => {
		return toc.items
			? toc.items
					.flatMap((item) => [
						item.url,
						item?.items?.map((item) => item.url),
					])
					.flat()
					.filter(Boolean)
					.map((id) => id?.split("#")[1])
					.map((id) => {
						const [el] = createSignal<HTMLElement | null>(
							document.getElementById(id)
						);
						return el;
					})
			: [];
	});

	// createEffect(() => {
	// 	itemIds()?.forEach((el) => {
	// 		if (!el()) {
	// 			return;
	// 		}
	// 		useIntersectionObserver(
	// 			el,
	// 			([{ isIntersecting }]) => {
	// 				if (isIntersecting) {
	// 					setActiveId(el().getAttribute("id"));
	// 				}
	// 			},
	// 			{
	// 				rootMargin: "0% 0% -80% 0%",
	// 			}
	// 		);
	// 	});
	// });

	return (
		<div class={cn("space-y-2", className)}>
			<p class='font-bold text-lg'>目录</p>
			<Tree tree={toc} activeItem={activeId()} />
		</div>
	);
};

function useActiveItem(itemIds: Accessor<(string | undefined)[]>) {
	const [activeId, setActiveId] = createSignal<string>("");

	createEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{ rootMargin: `0% 0% -80% 0%` }
		);

		itemIds()?.forEach((id) => {
			if (!id) {
				return;
			}

			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		onCleanup(() => {
			itemIds()?.forEach((id) => {
				if (!id) {
					return;
				}

				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			});
		});
	});

	return activeId;
}

interface TreeProps {
	tree: TableOfContents;
	level?: number;
	activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
	return tree?.items?.length && level < 3 ? (
		<ul class={cn("m-0 list-none", { "pl-4": level !== 1 })}>
			<For each={tree.items}>
				{(item, index) => {
					return (
						<li class={cn("mt-0 pt-2")}>
							<a
								href={item.url}
								class={cn(
									"inline-block no-underline text-sm",
									item.url === `#${activeItem}`
										? "font-bold text-primary"
										: "text-on-background",
									"hover:font-bold hover:text-primary"
								)}
							>
								{item.title}
							</a>
							{item.items?.length ? (
								<Tree
									tree={item}
									level={level + 1}
									activeItem={activeItem}
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
