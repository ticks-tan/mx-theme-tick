/**
 * 主题切换组件
 */

import { useTheme } from "~/lib/theme";
import { Sun, Moon } from "~/components/ui/icon";
import { cn } from "~/lib/utils";
import { Component, createMemo } from "solid-js";

interface ThemeToggleProps {
    className?: string;
}

const ThemeToggle : Component<ThemeToggleProps> = ({
    className
}) => {

    const [theme, toggle] = useTheme();

    return (
        <div class={cn("flex items-center gap-2 p-2", className)}>
            <div onClick={() => {toggle(false);}}>
                <Sun class={cn("w-5 h-5 cursor-pointer", theme() == "light" && "fill-primary")}/>
            </div>
            <span>|</span>
            <div onClick={() => {toggle(true);}}>
                <Moon class={cn("w-5 h-5 cursor-pointer", theme() == "dark" && "fill-primary")}/>
            </div>
        </div>
    );
};

export default ThemeToggle;