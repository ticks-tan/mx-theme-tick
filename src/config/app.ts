/**
 * App配置
 */

// 导航栏配置
export type AppNavItem = {
    text: string,
    href: string,
};
export type AppNav = {
    top: AppNavItem[],
    bottom: AppNavItem[],
};

// 页脚配置
export type AppFooter = {
    // 备案信息，备案名与链接
    record?: {
        name: string,
        link: string,
    }
    // 网站开始运行时间
    startYear: number,
    // 其他文字
    other?: string,
}

// 主页简述
export type AppHero = {
    // 大标题
    title?: string,
    // 内容
    content: {
        // HTML标签类型
        type: keyof HTMLElementTagNameMap,
        // 文字
        text?: string,
        // 样式，支持tailwindcss类名
        style?: string,
    }[],
    // 内容公共样式
    contentStyle?: string,
    // 站外链接
    link: {
        link: string,
        text: string,
    }[],
}


export type AppConfig = {
    nav: AppNav,
    footer: AppFooter,
    hero: AppHero,
};