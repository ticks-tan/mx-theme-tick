/**
 * App图标使用
 */

import { Component } from "solid-js";
import { cn } from "~/lib/utils";

interface AppIconProps {
	viewBox?: string;
	className?: string;
}

export const Sun: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={cn(className)}
		>
			<path d='M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z' />
		</svg>
	);
};

export const Moon: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={cn(className)}
		>
			<path
				fill-rule='evenodd'
				d='M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Down: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path
				fill-rule='evenodd'
				d='M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Up: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path
				fill-rule='evenodd'
				d='M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Menu: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path
				fill-rule='evenodd'
				d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Tag: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path
				fill-rule='evenodd'
				d='M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Eye: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
			<path
				fill-rule='evenodd'
				d='M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Time: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path
				fill-rule='evenodd'
				d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Article: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path d='M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z' />
		</svg>
	);
};

export const FileDir: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path d='M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 0 0-3-3h-3.879a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H6a3 3 0 0 0-3 3v3.162A3.756 3.756 0 0 1 4.094 9h15.812ZM4.094 10.5a2.25 2.25 0 0 0-2.227 2.568l.857 6A2.25 2.25 0 0 0 4.951 21H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-2.227-2.568H4.094Z' />
		</svg>
	);
};

export const Pen: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path d='M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z' />
			<path d='M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z' />
		</svg>
	);
};

export const Warnning: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path
				fill-rule='evenodd'
				d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Refresh: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path
				fill-rule='evenodd'
				d='M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};

export const Close: Component<AppIconProps> = ({
	viewBox = "0 0 24 24",
	className = "w-4 h-4",
}) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={viewBox}
			fill='currentColor'
			class={className}
		>
			<path
				fill-rule='evenodd'
				d='M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z'
				clip-rule='evenodd'
			/>
		</svg>
	);
};
