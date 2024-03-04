import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense } from "solid-js";

import "~/styles/app.css";
import { useTheme } from "~/lib/theme";

export default function App() {
	const [_theme, _toggle] = useTheme();
	return (
		<Router
			root={(props) => (
				<div class="h-screen max-w-screen overflow-x-hidden flex flex-col gap-4 px-4 md:px-32">
					<Suspense>{props.children}</Suspense>
				</div>
			)}
		>
			<FileRoutes />
		</Router>
	);
}
