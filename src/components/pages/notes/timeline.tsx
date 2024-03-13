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
		sortBy: "modified",
		sortOrder: -1,
	});
}, "query-note-page-sort-modify");

type NoteItemType = Pick<
	NoteModel,
	"title" | "topic" | "nid" | "location" | "modified"
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
						modified: v.modified,
					} as NoteItemType;
			  })
			: [];
	});

	return (
		<Suspense fallback={<p>获取中 . . .</p>}>
			<ol class={cn("relative", className)}>
				<For each={mapNotes()}>
					{(item) => (
						<li class={cn("mb-4 ms-4")}>
							<time class='mb-1 text-sm font-normal leading-none text-on-background/60'>
								{FormatData(item.modified)}
							</time>
							<A
								href={`/notes/${item.nid}`}
								class='flex items-start gap-16'
							>
								<div class='flex gap-1 items-center'>
									<p>{item.title}</p>
									<span class='text-sm'>
										{item?.location}
									</span>
								</div>
								<div>{item.topic?.name}</div>
							</A>
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
