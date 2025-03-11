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
      text: "CUDA",
      icon: "c",
      prefix: "cuda/",
      link: "cuda/",
      children: "structure",
    },
    {
      text: "光线追踪",
      icon: "camera",
      prefix: "pbrt/",
      link: "pbrt/",
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
