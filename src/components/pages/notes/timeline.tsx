/**
 * 日记页面时间线组件
 */

import { NoteModel } from "@mx-space/api-client";
import { A, cache, createAsync } from "@solidjs/router";
import {
	Component,
	For,
	Suspense,
	createEffect,
	createMemo,
	createSignal,
} from "solid-js";
import { MXApi } from "~/lib/request";
import { FormatData, cn } from "~/lib/utils";

interface NoteTimelineProps {
	className?: string;
}

const fetchPageNotes = cache(async (page: number) => {
	return await MXApi.note.getList(page, 50, {
		select: ["title", "+topic", "topicId", "nid", "location", "created"],
		sortBy: "created",
		sortOrder: -1,
	});
}, "query-note-page-sort-created");

type NoteItemType = Pick<
	NoteModel,
	"title" | "topic" | "nid" | "location" | "created"
>;

const NoteTimeLine: Component<NoteTimelineProps> = ({ className }) => {
	const [curPage, setCurPage] = createSignal(1);

	const queryNotes = createAsync(() => fetchPageNotes(curPage() || 1));

	createEffect(() => {
		if (queryNotes()) {
			if (queryNotes().pagination.hasNextPage) {
				setCurPage(curPage() + 1);
			}
		}
	});

	const mapNotes = createMemo(() => {
		return queryNotes()
			? queryNotes().data.map((v) => {
					return {
						title: v.title,
						topic: v.topic,
						nid: v.nid,
						location: v.location,
						created: v.created,
					} as NoteItemType;
			  })
			: [];
	});

	return (
		<Suspense fallback={<p>获取中 . . .</p>}>
			<ol class={cn("relative", className)}>
				<For each={mapNotes()}>
					{(item) => (
						<li
							class={cn(
								"py-1 ms-2 relative",
								"before:bottom-0 before:absolute before:-start-4 before:border-l before:border-primary",
								"after:-start-5 after:top-1/2 after:w-2 after:h-2 after:rounded-full after:absolute after:bg-primary",
								"first:before:top-1/2 last:before:bottom-1/2 last:before:top-0 first:last:before:border-s-0"
							)}
						>
							<time class='mb-1 text-sm font-normal leading-none text-on-background/60'>
								{FormatData(item.created)}
							</time>
							<div class='flex items-center justify-between'>
								<div class='flex gap-1 items-center'>
									<A
										href={`/notes/${item.nid}`}
										class='hover:decoration-primary hover:underline'
									>
										{item.title}
									</A>
									<span class='text-sm'>
										{item?.location}
									</span>
								</div>
								<div class='hidden md:inline content-end'>
									{item.topic?.name}
								</div>
							</div>
						</li>
					)}
				</For>

				{/* <li class='ms-4'>
					<div class='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
					<time class='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
						April 2022
					</time>
					<h3 class='text-lg font-semibold text-gray-900 dark:text-white'>
						E-Commerce UI code in Tailwind CSS
					</h3>
					<p class='text-base font-normal text-gray-500 dark:text-gray-400'>
						Get started with dozens of web components and
						interactive elements built on top of Tailwind CSS.
					</p>
				</li> */}
			</ol>
		</Suspense>
	);
};

export default NoteTimeLine;
