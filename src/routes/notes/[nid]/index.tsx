/**
 * 日记详情页面
 */

import { Title } from "@solidjs/meta";
import { A, RouteDefinition, cache, createAsync, useParams } from "@solidjs/router";
import { ErrorBoundary, Show, Suspense, createSignal } from "solid-js";
import MainBox from "~/components/layout/main/main-box";
import NoteDetailShow from "~/components/pages/notes/note-detail";
import { MXApi } from "~/lib/request";
import { cn } from "~/lib/utils";


const fetchNoteDetail = cache(async (id: string) => {
    return await MXApi.note.getNoteById(id);
}, "");

type ParamsType = {
    nid: string,
}

export const router = {
    load: ({ params: {nid} }) => fetchNoteDetail(nid)
} satisfies RouteDefinition;

export default function NoteDetailPage() {

    const [params] = createSignal(useParams<ParamsType>());
    const queryNote = createAsync(() => fetchNoteDetail(params().nid));

    return (
        <>
        <Title>博客 | 随笔详情</Title>
        <MainBox>
            <ErrorBoundary fallback={<p class="text-center md:text-start mt-16 text-lg ml-8 text-error">加载出错了，你可以返回 <A href="/notes" class="underline decoration-primary text-primary">我的随笔</A></p>}>
            <Show when={queryNote()}>
                <NoteDetailShow note={queryNote()}/>
            </Show>
            </ErrorBoundary>
        </MainBox>
        </>
    );
}