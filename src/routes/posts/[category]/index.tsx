/**
 * /posts/:category
 * 特定类别下的文章列表
 */

import { Suspense } from "solid-js";

export default function PostCategoryPage() {
    return (
        <>
        <Suspense>
        <main class="grow">
            <p>分类文章</p>
        </main>
        </Suspense>
        <div></div>
        </>
    )
}