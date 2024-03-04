/**
 * 页脚组件
 */

import { A, cache, createAsync } from "@solidjs/router";
import { Component, For } from "solid-js";


import { AppFooter, AppNavItem } from "~/config/app";
import { cn } from "~/lib/utils";

interface FooterProps {
    config: AppFooter,
    className?: string,
};

const getNowYear = cache(async () => {
    return new Date().getFullYear();
}, "nowYear");

export const route = {
    load: () => getNowYear()
}

const Footer : Component<FooterProps> = ({
    config,
    className
}) => {
    const year = createAsync(() => getNowYear());
    return (
        <footer class={cn("min-h-16 flex flex-col items-center py-4", className)}>
            {/* 底部链接 */}
            <div class="flex items-center justify-center gap-2">
                <For each={config.nav}>
                    {(it, idx) => (
                        <>
                        <A 
                            href={it.href}
                            class=" hover:underline text-center"
                            target={it.external ? "_blank" : ""}
                        >
                            {it.text}
                        </A>
                        {idx() != config.nav.length - 1 && (
                            <div class="bg-on-background w-1.5 h-1.5 rounded-full"/>
                        )}
                        </>
                    )}
                </For>
            </div>
            {/* 其他文字 */}
            {config.other && config.other.length && (
                <div class="flex items-center justify-center">
                    {config.other}
                </div>
            )}
            {/* Coyright */}
            <div class="flex items-center justify-center gap-4">
                <span>©{config.year}{year() && (year() as number > config.year) && `-${year()}` }</span>
                <span>|</span>
                <span>Powered by <A href="https://github.com/mx-space" target="_blank" class="hover:underline hover:font-bold">Mix Space</A> and <A href="https://ticks.cc/tick-tan/mx-theme-tick" target="_blank" class="hover:font-bold hover:underline">tick</A></span>
            </div>
        </footer>
    )
}

export default Footer;