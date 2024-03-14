import { A, useLocation } from "@solidjs/router";
import { Component, For, Show, createEffect, createSignal } from "solid-js";
import { useWindowScroll, useElementVisibility, useMediaQuery } from "solidjs-use";


import { Close, Menu } from "~/components/ui/icon";
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
    const [el, setEl] = createSignal<HTMLDivElement>();
    const [top, setTop] = createSignal(false);

    const {y} = useWindowScroll();
    const isMdScreen = useMediaQuery("(min-width: 768px)");
    const isMenuVisibilty = useElementVisibility(el);

    createEffect(() => {
        setTop(y() < 10);
    });
    createEffect(() => {
        if (!isMenuVisibilty() && isMdScreen()) {
            setShowMenu(false);
        }
    });

    const toggleShowMenu = () => {
        setShowMenu(!showMenu());
    };

	const active = (path: string) => cn(path == location.pathname 
        ? "border-primary" 
        : "border-transparent hover:border-primary"
    );

	return (
        <header attr:data-testid="useWindowScroll" aria-label="Header" class={cn("bg-surface", className, !top() && "shadow-sm shadow-on-background/40 border-b-0.5")}>
		<div class={cn("flex items-center gap-4 justify-between px-4 w-full h-16")}>
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
                <Show when={!showMenu()}>
                    <Menu className={cn("w-5 h-5")} />
                </Show>
                <Show when={showMenu()}>
                    <Close className="w-5 h-5"/>
                </Show>
            </button>
            {/* MobileMenu */}
            {showMenu() && (
                <div 
                    ref={setEl}
                    class="absolute md:hidden left-0 right-0 flex flex-col gap-3 py-3 bg-background items-center border-t top-16 border-b-2 z-50"
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