/**
 * 横向分割线
 */

import { ParentComponent } from "solid-js";
import { cn } from "~/lib/utils";

interface DividerProps {
	className?: string,
}

const HorizontalDivider: ParentComponent<DividerProps> = ({ children, className }) => {
	return (
		<span class={cn('relative flex justify-center', className)}>
			<div class='absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-on-background to-transparent opacity-75'></div>
			<span class='relative z-10 bg-background px-6'>{children}</span>
		</span>
	);
};

export default HorizontalDivider;
