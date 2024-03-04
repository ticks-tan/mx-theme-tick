/**
 * 主题切换
 */

import { Accessor, createSignal } from "solid-js";
import { useDark, useToggle } from "solidjs-use";

type Theme = "light" | "dark";
const [theme, setTheme] = createSignal<Theme>("light");


type Second<T extends [any, any]> = T[1];
type Ret2 = Second<ReturnType<typeof useToggle<boolean>>>;

export function useTheme() : [Accessor<Theme>, Ret2] {
    const isDark = useDark({
        valueDark: "dark",
        valueLight: "light",
        selector: "body",
        onChanged(isDark, defaultHandler) {
            setTheme(isDark ? "dark" : "light");
            defaultHandler(isDark ? "dark" : "light");
        },
    });
    const [_val, toggle] = useToggle(isDark);
    return [theme, toggle];
}