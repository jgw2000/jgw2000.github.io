---
# 这是文章的标题
title: 渐进复杂度
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 2
# 设置作者
author: 被子
# 设置写作时间
date: 2024-08-23
# 一个页面可以有多个分类
category:
  - 算法
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## *O* 定义
::: tip 公式
$$
\mathcal{O}(g(n)) = \{f(n) : 0 \le f(n) \le cg(n) \; \forall \; n \ge n_0\}
$$
:::

<div style="text-align: center;">
<img src="/clrs/images/chapter3_1.png" width="300" height="300"/>
</div>

## *Ω* 定义
::: tip 公式
$$
\Omega(g(n)) = \{f(n) : 0 \le cg(n) \le f(n) \; \forall \; n \ge n_0\}
$$
:::

<div style="text-align: center;">
<img src="/clrs/images/chapter3_2.png" width="300" height="300"/>
</div>

## *Θ* 定义
::: tip 公式
$$
\Theta(g(n)) = \{f(n) : 0 \le c_1g(n) \le f(n) \le c_2g(n) \; \forall \; n \ge n_0\}
$$
:::

<div style="text-align: center;">
<img src="/clrs/images/chapter3_3.png" width="300" height="300"/>
</div>

## *o* 定义
::: tip 公式
$$
\mathcal{o}(g(n)) = \{f(n) : \forall c \; \exists \; n_0 > 0 \;, \;0 \le f(n) < cg(n) \; \forall \; n \ge n_0\}
$$
即
$$
\lim_{n\to\infty}\frac{f(n)}{g(n)} = 0
$$
:::

## *ω* 定义
::: tip 公式
$$
\omega(g(n)) = \{f(n) : \forall c \; \exists \; n_0 > 0 \;, \;0 \le cg(n) < f(n) \; \forall \; n \ge n_0\}
$$
即
$$
\lim_{n\to\infty}\frac{f(n)}{g(n)} = \infty
$$
:::