/**
 * 卡片组件
 */

import { A } from "@solidjs/router";
import { ParentComponent } from "solid-js";
import { cn } from "~/lib/utils";

interface CardProps {
	className?: string;
	itemAlign?: "start" | "center" | "end";
	rounded?: boolean;
	link?: {
		href: string;
		external: boolean;
	};
}

const Card: ParentComponent<CardProps> = ({
	children,
	className,
	itemAlign = "center",
	rounded = true,
	link,
}) => {
	if (link) {
		return (
			<A
				href={link.href}
				target={link.external ? "_blank" : "_self"}
				class={cn(
					"group relative block cursor-pointer before:absolute before:inset-0",
					rounded && "before:rounded-md",
					"before:border-2 before:border-dashed before:border-on-background"
				)}
			>
				<div
					class={cn(
						"relative flex h-full transform hover:border-2 border-on-background bg-background transition-transform duration-300 hover:-translate-x-2 hover:-translate-y-2 p-2",
						`items-${itemAlign}`,
						rounded && "rounded-md",
						className
					)}
				>
					{children}
				</div>
			</A>
		);
	} else {
		return (
			<div
				class={cn(
					"group relative block cursor-pointer before:absolute before:inset-0",
					rounded && "before:rounded-md",
					"before:border-2 before:border-dashed before:border-on-background"
				)}
			>
				<div
					class={cn(
						"relative flex h-full transform border-2 border-on-background bg-background transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 p-2",
						`items-${itemAlign}`,
						rounded && "rounded-md"
					)}
				>
					{children}
				</div>
			</div>
		);
	}
};

export default Card;
