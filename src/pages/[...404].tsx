/**
 * 全局404页面
 */

import { MetaProvider, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

export default function NotFound() {

	return (
		<MetaProvider>
		<Title>404 | Not Found</Title>
		<main class='text-center mx-auto bg-background p-4 grow'>
			<h1 class='max-6-xs text-4xl text-primary font-thin my-16'>
				404 Not Found (⊙_⊙)？
			</h1>
			<h1>你似乎来到了不该来的地方，<A href="/" class=" text-error">快快回去</A>。</h1>
		</main>
		</MetaProvider>
	);
}
