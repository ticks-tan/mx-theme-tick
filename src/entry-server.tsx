// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang='en'>
				<head>
					<meta charset='utf-8' />
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1'
					/>
					<link rel='icon' href='/favicon.ico' />
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.1.0/style.css" />
					{assets}
				</head>
				<body>
					{children}
					{/* <div id="app">{children}</div> */}
					{scripts}
				</body>
			</html>
		)}
	/>
));
