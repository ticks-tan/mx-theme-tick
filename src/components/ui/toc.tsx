/**
 * 目录组件
 */

import {
	Component,
	For,
	createEffect,
	createMemo,
	createSignal,
	onCleanup,
} from "solid-js";
import { useMounted } from "solidjs-use";

import { TableOfContents } from "~/lib/toc";
import { cn } from "~/lib/utils";

interface TocProps {
	toc: TableOfContents;
	className?: string;
}

const Toc: Component<TocProps> = ({ toc, className }) => {
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
			: [];
	});

	const activeHeading = useActiveItem(itemIds());
	const isMounted = useMounted();

	return isMounted ? (
		<div class='space-y-2'>
			<p class='font-medium'>On This Page</p>
			<Tree tree={toc} activeItem={activeHeading()} />
		</div>
	) : null;
};

function useActiveItem(itemIds: (string | undefined)[]) {
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

		itemIds?.forEach((id) => {
			if (!id) {
				return;
			}

			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		});

		onCleanup(() => {
			itemIds?.forEach((id) => {
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
									"inline-block no-underline",
									item.url === `#${activeItem}`
										? "font-medium text-primary"
										: "text-sm text-muted-foreground"
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
