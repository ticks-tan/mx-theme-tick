import { Suspense } from "solid-js";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { MetaProvider } from "@solidjs/meta";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import "~/styles/app.css";
import { useTheme } from "~/lib/theme";

export default function App() {
	const [_theme, _toggle] = useTheme();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 5000,
			},
		},
	});

	return (
		<QueryClientProvider client={queryClient}>
			<Router
				root={(props) => (
					<MetaProvider>
						<div class='h-screen max-w-screen overflow-x-hidden flex flex-col gap-4 px-4 md:px-8 lg:mx-32'>
							<Suspense>{props.children}</Suspense>
						</div>
					</MetaProvider>
				)}
			>
				<FileRoutes />
			</Router>
		</QueryClientProvider>
	);
}
