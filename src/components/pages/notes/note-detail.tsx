/**
 * 日记详情
 */

import { NoteModel } from "@mx-space/api-client";
import { Component, Show, Suspense } from "solid-js";
import { Time } from "~/components/ui/icon";
import { FormatData, cn } from "~/lib/utils";

interface NoteDetailShowProps {
    note: NoteModel,
    className?: string,
}

const NoteDetailShow : Component<NoteDetailShowProps> = ({
    note,
    className
}) => {
    return (
        <Suspense>
        <div class={cn("mx-2 md:mx-32", className)}>
            {/* 标题 */}
            <p class="text-center text-xl font-bold">{note.title}</p>
            {/* 其他信息 */}
            <div class="flex items-center justify-center">
                {/* 时间 */}
                <div class="grid grid-cols-2 gap-2">
                    <Time className="w-4 h-4"/>
                    <span>{FormatData(note.created)}</span>
                </div>
                {/* 位置 */}
                <Show when={note.location}>
                <div class="grid grid-cols-2 gap-2">
                    <Time className="w-4 h-4"/>
                    <span>{FormatData(note.created)}</span>
                </div>
                </Show>
                {/* 心情 */}
                {/* 话题 */}
            </div>
            {/* 内容 */}
            <main></main>
        </div>
        </Suspense>
    );
};

export default NoteDetailShow;