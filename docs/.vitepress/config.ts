import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Ginyi",
    description: "记录 Coding 时遇到的一些问题，总结归纳！",
    ignoreDeadLinks: true,
    base: "/",
    head: [["link", { rel: "icon", type: "image/svg+xml", href: "logo.png" }]],
    lastUpdated: true,
    themeConfig: {
        /**
         * 左上角的标题，false为不显示
         */
        siteTitle: "Ginyi",
        /**
         * 左上角的 logo
         */
        logo: "/logo.png",
        /**
         * 右上角 GitHub
         */
        socialLinks: [{ icon: "github", link: "https://github.com/Ginyi3705" }],
        /**
         * 右上角的导航栏
         * text: 标题
         * link: 文档链接
         * items: 子项
         */
        nav: [
            { text: "首页", link: "/" },
            {
                text: "前端知识",
                items: [
                    { text: "Vue", link: "/frontend/vue/index" },
                    { text: "React", link: "/frontend/react/index" },
                    { text: "JavaScript", link: "/frontend/JavaScript/index" },
                    { text: "微信小程序", link: "/frontend/wechat/index" },
                ],
            },
            { text: "后端知识", link: "/backend/index" },
            { text: "面试整理", link: "/interview/index" },
        ],
        /**
         * 页脚
         */
        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2023 - Now Ginyi@aliyun.com. All rights reserved.",
        },
    },
    vite: {
      server: {
        host: true,
        port: 3000,
        open: false
      }
    },
});
