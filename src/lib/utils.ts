import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function FormatData(input: string | number | Date) : string {
	const data = new Date(input);
	return data.toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "numeric",
		day: "numeric"
	});
}