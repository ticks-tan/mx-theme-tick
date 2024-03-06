import { A, useLocation } from "@solidjs/router";
import { Component, For, createEffect, createSignal, onMount } from "solid-js";
import { useWindowScroll } from "solidjs-use";


import { Menu } from "~/components/ui/icon";
import ThemeToggle from "~/components/ui/theme-toggle";
import { AppNavItem } from "~/config/app";
import { cn } from "~/lib/utils";

interface AppHeaderProps {
    title?: string,
    nav?: AppNavItem[],
    className?: string,
};

const AppHeader : Component<AppHeaderProps> = ({
    title,
    nav,
    className
}) => {
	const location = useLocation();
    const [showMenu, setShowMenu] = createSignal<boolean>(false);
    const [top, setTop] = createSignal(false);

    const {x, y} = useWindowScroll();

    createEffect(() => {
        setTop(y() < 10);
    })

    const toggleShowMenu = () => {
        setShowMenu(!showMenu());
    };

	const active = (path: string) => cn(path == location.pathname 
        ? "border-primary" 
        : "border-transparent hover:border-primary"
    );

	return (
        <header attr:data-testid="useWindowScroll" aria-label="Header" class={cn("bg-surface sticky top-0 z-[99]", !top() && " border-b")}>
		<div class={cn("flex items-center gap-4 justify-between px-4 w-full h-16", className)}>
            <A href="/" class="bg-gradient-to-r bg-clip-text from-tertiary to-secondary via-primary text-transparent text-lg font-bold p-2">{title}</A>
			<div class='p-2 hidden md:block'>
                <nav aria-label="Global">
                    <ul class="flex items-center">
                <For each={nav}>
                    {(it) => (
                        <li class={cn("border-b-2", "mx-1.5", "md:mx-4", active(it.href))}>
                            <A href={it.href}>{it.text}</A>
                        </li>
                    )}
                </For>
                </ul>
                </nav>
			</div>
            <ThemeToggle className="hidden md:flex"/>
            {/* Menu */}
            <button
                class={cn("md:hidden inline-flex items-center p-2 relative")}
                id="mobile-menu"
                aria-haspopup='true'
				aria-expanded='true'
                onClick={toggleShowMenu}
            >
                <Menu class={cn("w-5 h-5")} />
            </button>
            {/* MobileMenu */}
            {showMenu() && (
                <div 
                    class="absolute left-0 right-0 mx-8 flex flex-col gap-3 py-3 bg-background items-center border-t top-16 border-b-2 z-[99]"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="mobile-menu"
                >
                    <For each={nav}>
                    {(it) => (
                        <div class={cn("border-b-2", active(it.href))}>
                            <A href={it.href}>{it.text}</A>
                        </div>
                    )}
                </For>
                <ThemeToggle className="flex"/>
                </div>
            )}

		</div>
        </header>
	);
}

export default AppHeader;