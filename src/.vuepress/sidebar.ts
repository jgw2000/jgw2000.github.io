import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "算法导论",
      icon: "laptop-code",
      prefix: "clrs/",
      link: "clrs/",
      children: "structure",
    },
    {
      text: "实时渲染",
      icon: "shapes",
      prefix: "rtr/",
      link: "rtr/",
      children: "structure",
    },
    {
      text: "如何使用",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    "intro",
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    },
  ],
});
