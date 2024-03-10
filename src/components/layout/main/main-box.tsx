import { ParentComponent, onMount } from "solid-js";

import { useTheme } from "~/lib/theme";
import { cn, generateRandomColor } from "~/lib/utils";
import { updateTheme } from "tailwind-material-colors/lib/updateTheme.esm";

interface MainBoxProps {
	className?: string,
}

const MainBox: ParentComponent<MainBoxProps> = ({ children, className }) => {
	onMount(() => {
		useTheme();
		const priamryColor = generateRandomColor();
		updateTheme(
			{
				primary: priamryColor,
			},
			"class"
		);
	})
	return <div class={cn('container flex-1', className)}>{children}</div>;
};

export default MainBox;
