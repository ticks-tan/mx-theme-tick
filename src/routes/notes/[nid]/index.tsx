/**
 * 日记详情页面
 */

import { Title } from "@solidjs/meta";
import { RouteDefinition, cache, useParams } from "@solidjs/router";
import { Suspense, createSignal } from "solid-js";
import { className } from "solid-js/web";
import MainBox from "~/components/layout/main/main-box";
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

    const params = createSignal<ParamsType>(useParams());

    return (
        <>
        <Title>博客 | 随笔详情</Title>
        <MainBox>
            
        </MainBox>
        </>
    );
}