import { ParentComponent } from "solid-js";
import { cn } from "~/lib/utils";

interface MainBoxProps {
	className?: string,
}

const MainBox: ParentComponent<MainBoxProps> = ({ children, className }) => {
	return <div class={cn('container flex-1', className)}>{children}</div>;
};

export default MainBox;
