/**
 * 日记列表页面
 */

import { Title } from "@solidjs/meta";
import { ErrorBoundary } from "solid-js";

import MainBox from "~/components/layout/main/main-box";
import NoteTimeLine from "~/components/pages/notes/timeline";

export default function NoteListPage() {
	return (
		<>
            <Title>博客 | 随笔列表</Title>
			<MainBox>
				<div class="mx-8 md:mx-16 lg:mx-32 mt-16">
                <p class="text-3xl mb-4 font-bold">我的随笔</p>
				<ErrorBoundary fallback={<p class="mt-8 text-error">{"获取失败，你可以刷新页面试试 (っ °Д °;)っ "}</p>}>
					<NoteTimeLine className="m-8"/>
				</ErrorBoundary>
				</div>
            </MainBox>
		</>
	);
}
