---
# 这是文章的标题
title: 光栅化
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 2
# 设置作者
author: 被子
# 设置写作时间
date: 2024-10-11
# 一个页面可以有多个分类
category:
  - 实时渲染
# 一个页面可以有多个标签
tag:
  - 光栅化
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 光栅化三角形
<div style="text-align: center;">
<img src="/rtr/images/rasterize_1.png" width="300" height="300"/>
</div>

::: tip
采样判断每一个像素的中心是否在三角形内
:::

```C++
for (int x = xmin; x < xmax; ++x)
  for (int y = ymin; y < ymax; ++y)
    image[x][y] = inside(tri, x + 0.5, y + 0.5);
```

::: tip 如何判断点在三角形内？
:::
<div style="text-align: center;">
<img src="/rtr/images/rasterize_2.png" width="300" height="300"/>
</div>

$$
(\vec{ac}\times\vec{ab})\cdot(\vec{ac}\times \vec{aq})>0
$$

同理有

$$
\begin{aligned}
(\vec{cb}\times\vec{ca})\cdot(\vec{cb}\times \vec{cq})>0 \\
(\vec{ba}\times\vec{bc})\cdot(\vec{ba}\times \vec{bq})>0
\end{aligned}
$$

:::caution
下面是一个种更简单的判断方法，不过三角形的顶点 A → B → C 必须是逆时针顺序（左右手坐标系都适用）！
:::

$$
\begin{aligned}
[\vec{ab}\times\vec{aq}]_z > 0 \\
[\vec{bc}\times\vec{bq}]_z > 0 \\
[\vec{ca}\times\vec{cq}]_z > 0 \\
\end{aligned}
$$