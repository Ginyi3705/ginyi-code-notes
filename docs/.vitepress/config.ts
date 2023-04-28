import {defineConfig} from "vitepress";

export default defineConfig({
    title: "Ginyi",
    description: "记录 Coding 时遇到的一些问题，总结归纳！",
    ignoreDeadLinks: true,
    base: "/",
    lang: "简体中文",
    head: [["link", {rel: "icon", type: "image/svg+xml", href: "logo.png"}]],
    lastUpdated: true,
    vite: {
        server: {
            host: true,
            port: 3000,
            open: false
        }
    },
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
        socialLinks: [{icon: "github", link: "https://github.com/Ginyi3705"}],
        /**
         * 编辑链接
         */
        editLink: {
            pattern: "https://github.com/Ginyi3705/ginyi-code-notes",
            text: "有错误？上 Github 编辑它！"
        },
        lastUpdatedText: "最后更新于 ",
        /**
         * 文档页脚
         */
        docFooter: {
            prev: "上一篇",
            next: '下一篇'
        },
        /**
         * 页脚
         */
        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2023 - Now Ginyi@aliyun.com. All rights reserved.",
        },
        /**
         * 右上角的导航栏
         * text: 标题
         * link: 文档链接
         * items: 子项
         */
        nav: [
            {text: "首页", link: "/"},
            {
                text: "前端知识",
                items: [
                    {text: "Vue", link: "/frontend/vue/vue3"},
                    {text: "React", link: "/frontend/react/react"},
                    {text: "JavaScript", link: "/frontend/JavaScript/utils"},
                    {text: "微信小程序", link: "/frontend/wechat/index"},
                ],
            },
            {text: "后端知识",
            items: [
                {text: "Java", link: "/backend/java"},
                {text: "Linux常用命令", link: "/backend/linux"},
                {text: "Docker", link: "/backend/docker"},
                {text: "Mysql", link: "/backend/mysql"},
                {text: "MyBatis-Plus", link: "/backend/mybatis-plus"},
            ],},
            {text: "面试整理", link: "/interview/index"},
        ],
        sidebar: [
            {
                text: "前端知识",
                collapsed: false,
                items: [
                    {text: "Vue3", link: "/frontend/vue/vue3"},
                    {text: "React", link: "/frontend/react/react"},
                    {text: "常用工具类", link: "/frontend/JavaScript/utils"},
                ]
            },
            {
                text: "后端知识",
                collapsed: false,
                items: [
                    {text: "Java", link: "/backend/java"},
                    {text: "Linux常用命令", link: "/backend/linux"},
                    {text: "Docker", link: "/backend/docker"},
                    {text: "Mysql", link: "/backend/mysql"},
                    {text: "MyBatis-Plus", link: "/backend/mybatis-plus"},
                ]
            },
            {
                text: "面试整理",
                collapsed: false,
                items: [
                    {text: "待写~", link: "/interview/index"},
                ]
            },
        ]
    },
});
