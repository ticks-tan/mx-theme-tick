import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import removeMarkdown from "remove-markdown";

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

/**
 * 截取指定长度的中英文混合字符串
 * @param  {String} str 待截取的字符串
 * @param  {Number} n   截取长度（中文字符为英文的 double）
 * @return {String}     截取后的字符串
 */
export function SubString(str, n) {    
	const r = /[^\x00-\xff]/g; 
	let m;
  
	if (str.replace(r, '**').length > n) {
	  m = Math.floor(n / 2);  
  
	  for (var i = m, l = str.length; i < l; i++) {    
		if (str.substr(0, i).replace(r, '**').length >= n) {    
		  return str.substr(0, i); 
		}    
	  } 
	}
  
	return str;
}

// Markdown生成描述
export function mdSummary(md: string, length: number = 180) {
	// let characterSelector = '[\\s\\S]'; // dot doesn’t match newlines; [\s\S] matches anything
	// let regex = new RegExp(`^[^#\\s]${characterSelector}{1,${length}}(?=(?:\\s|$))`, 'gm')
	// let matches = md.match(regex)
	// if (matches && matches.length) {
	//     // return removeMarkdown(matches.shift()).replace(/\n{1,}/g, ' ').trim()
	// 	return removeMarkdown(matches.shift()).trim();
	// }
	const md1: string = removeMarkdown(md).replace(/\n{1,}/g, ' ').trim();
	let str = "";
	let idx = 1;
	for (const ch of md1) {
		str = str.concat(ch);
		if (idx >= length) {
			break;
		}
		idx += 1;
	}
	
	return str;
}