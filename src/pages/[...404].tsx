/**
 * 全局404页面
 */

import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import MainBox from "~/components/layout/main/main-box";

export default function NotFound() {
	return (
		<>
			<Title>404 | Not Found</Title>
			<MainBox className='text-center mx-auto bg-background p-4'>
				<h1 class='max-6-xs text-4xl text-primary font-thin my-16'>
					404 Not Found (⊙_⊙)？
				</h1>
				<h1>
					你似乎来到了不该来的地方，
					<A href='/' class=' text-error'>
						快快回去
					</A>
					。
				</h1>
			</MainBox>
		</>
	);
}
