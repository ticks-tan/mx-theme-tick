import { ParentComponent } from "solid-js";
import { cn } from "~/lib/utils";

interface MainBoxProps {
	className?: string,
}

const MainBox: ParentComponent<MainBoxProps> = ({ children, className }) => {
	return <main class={cn('grow', className)}>{children}</main>;
};

export default MainBox;
