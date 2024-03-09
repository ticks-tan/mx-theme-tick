/**
 * 文章目录类型
 */

import { toc } from "mdast-util-toc";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import { parse } from "node-html-parser";
import Slugger from "github-slugger";

const textTypes = ["text", "emphasis", "strong", "inlineCode"];

function flattenNode(node) {
	const p = [];
	visit(node, (node) => {
		if (!textTypes.includes(node.type)) return;
		p.push(node.value);
	});
	return p.join(``);
}

interface TocItem {
	// 标题（显示名称）
	title: string;
	// 链接地址
	url: string;
	// 子项目
	items?: TocItem[];
}

export type TocItems = {
	items?: TocItem[];
}

function getItems(node, current): TocItems {
	if (!node) {
		return {};
	}

	if (node.type === "paragraph") {
		visit(node, (item) => {
			if (item.type === "link") {
				current.url = item.url;
				current.title = flattenNode(node);
			}

			if (item.type === "text") {
				current.title = flattenNode(node);
			}
		});

		return current;
	}

	if (node.type === "list") {
		current.items = node.children.map((i) => getItems(i, {}));

		return current;
	} else if (node.type === "listItem") {
		const heading = getItems(node.children[0], {});

		if (node.children.length > 1) {
			getItems(node.children[1], heading);
		}

		return heading;
	}

	return {};
}

const getToc = () => (node, file) => {
	const table = toc(node);
	file.data = getItems(table.map, {});
};

export type TableOfContents = TocItems;

export async function getTableOfContents(
	content: string
): Promise<TableOfContents> {
	const result = await remark().use(getToc).process(content);

	return result.data;
}

export async function genHtmlAnchor(html: string) {
	if (!html.length) {
		return "";
	}
	try {
		const root = parse(html);
		const slugger = new Slugger();

		for (const h of root.querySelectorAll("h1, h2, h3, h4")) {
			const slug = h.getAttribute("id") || slugger.slug(h.textContent);
			h.setAttribute("id", slug);
			h.innerHTML = `<a href="#${slug}">${h.innerHTML}</a>`;
		}
		return root.toString();
	} catch (e) {
		console.log(`node parse html error: ${e}`);
	}
}
