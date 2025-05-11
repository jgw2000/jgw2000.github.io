---
# 这是文章的标题
title: PBR
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 4
# 设置作者
author: 被子
# 设置写作时间
date: 2025-5-11
# 一个页面可以有多个分类
category:
  - 实时渲染
# 一个页面可以有多个标签
tag:
  - PBR
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 微平面理论
::: info
微平面理论将粗糙的平面建模成为一组微平面的集合，每一个单独的微平面都非常小，无法被相机分辨，然而这些微平面的集合对于散射光的角度分布却有着巨大的影响。
:::
![](/rtr/images/pbr_1.png)

微平面模型主要由两部分组成：
1. 微平面的法线统计分布
2. 微平面的 BSDF

除此之外，以下三个因素也会对光的散射产生影响：遮挡、阴影和微平面间的反射

![](/rtr/images/pbr_2.png)

### 微平面的法线统计分布

![](/rtr/images/pbr_3.png)

$$
\int_{m\in \Theta} D(m)(n\cdot m) dm = 1
$$

$$
\int_{m\in \Theta} D(m)(v\cdot m) dm = v\cdot n
$$
