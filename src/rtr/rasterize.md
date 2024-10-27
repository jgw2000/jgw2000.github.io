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

## 重心坐标计算
假设 P 是三角形 ABC 内一点，有
$$
\begin{aligned}
x_p &= \alpha x_a + \beta x_b + \gamma x_c \\[3px]
y_p &= \alpha y_a + \beta y_b + \gamma y_c \\[3px]
1 &= \alpha + \beta + \gamma
\end{aligned}
$$
可得
$$
\begin{aligned}
\alpha &= \frac{(x_p - x_c)(y_b - y_c) - (x_b - x_c)(y_p - y_c)}{(x_a - x_c)(y_b - y_c) - (x_b - x_c)(y_a - y_c)} \\[3px]
\beta &= \frac{(x_p - x_c)(y_a - y_c) - (x_a - x_c)(y_p - y_c)}{(x_b - x_c)(y_a - y_c) - (x_a - x_c)(y_b - y_c)} \\[3px]
\gamma &= 1 - \alpha - \beta
\end{aligned}
$$

## 透视正确插值
![](/rtr/images/rasterize_3.png)

1. 三角形 ABC 根据透视投影矩阵 M 变换到 A'B'C'
$$
\begin{aligned}
\begin{pmatrix} A'w_a \\ w_a\\ \end{pmatrix} &= M\begin{pmatrix} A \\ 1 \end{pmatrix} \\[3px]
\begin{pmatrix} B'w_b \\ w_b\\ \end{pmatrix} &= M\begin{pmatrix} B \\ 1 \end{pmatrix} \\[3px]
\begin{pmatrix} C'w_c \\ w_c\\ \end{pmatrix} &= M\begin{pmatrix} C \\ 1 \end{pmatrix} \\[3px]
\begin{pmatrix} P'w_p \\ w_p\\ \end{pmatrix} &= M\begin{pmatrix} P \\ 1 \end{pmatrix} \\[3px]
\end{aligned}
$$

2. P 和 P' 分别是三角形 ABC 和 A'B'C' 内的一点，有
$$
\begin{aligned}
P &= \alpha A + \beta B + \gamma C \\
P' &= \alpha' A' + \beta' B' + \gamma' C'
\end{aligned}
$$
且
$$
\begin{aligned}
\alpha + \beta + \gamma &= 1 \\
\alpha' + \beta' + \gamma' &= 1
\end{aligned}
$$

3. 结合 1 和 2 可得
$$
\begin{aligned}
\begin{pmatrix} P \\ 1\\ \end{pmatrix} &= \alpha \begin{pmatrix} A \\ 1\\ \end{pmatrix} + \beta \begin{pmatrix} B \\ 1\\ \end{pmatrix} + \gamma \begin{pmatrix} C \\ 1\\ \end{pmatrix} \\[3px]
M\begin{pmatrix} P \\ 1\\ \end{pmatrix} &= M\alpha \begin{pmatrix} A \\ 1\\ \end{pmatrix} + M\beta \begin{pmatrix} B \\ 1\\ \end{pmatrix} + M\gamma \begin{pmatrix} C \\ 1\\ \end{pmatrix} \\[3px]
P'w_p &= \alpha A'w_a + \beta B'w_b + \gamma C'w_c \\[3px]
w_p &= \alpha w_a + \beta w_b + \gamma w_c
\end{aligned}
$$
则
$$
\begin{aligned}
P' &= \frac{\alpha A'w_a + \beta B'w_b + \gamma C'w_c}{\alpha w_a + \beta w_b + \gamma w_c} \\[3px]
&= \frac{\alpha w_a}{\alpha w_a + \beta w_b + \gamma w_c}A' + \frac{\beta w_b}{\alpha w_a + \beta w_b + \gamma w_c}B' + \frac{\gamma w_c}{\alpha w_a + \beta w_b + \gamma w_c}C'\\[3px]
&= \alpha' A' + \beta' B' + \gamma' C'
\end{aligned}
$$
从而有
$$
\begin{aligned}
\alpha' &= \frac{\alpha w_a}{\alpha w_a + \beta w_b + \gamma w_c} \\[3px]
\beta' &= \frac{\beta w_b}{\alpha w_a + \beta w_b + \gamma w_c} \\[3px]
\gamma' &= \frac{\gamma w_c}{\alpha w_a + \beta w_b + \gamma w_c}
\end{aligned}
$$

4. 令
$$
k = \frac{1}{\alpha w_a + \beta w_b + \gamma w_c}
$$
可得
$$
\begin{aligned}
\alpha &= \frac{\alpha'}{w_a k} \\[3px]
\beta &= \frac{\beta'}{w_b k} \\[3px]
\gamma &= \frac{\gamma'}{w_c k} \\[3px]
\end{aligned}
$$
又
$$
1 = \alpha + \beta + \gamma = \frac{\alpha'}{w_a k} + \frac{\beta'}{w_b k} + \frac{\gamma'}{w_c k}
$$
可得
$$
\begin{aligned}
k &= \frac{\alpha'}{w_a} + \frac{\beta'}{w_b} + \frac{\gamma'}{w_c} \\[3px]
\alpha &= \frac{\frac{\alpha'}{w_a}}{\frac{\alpha'}{w_a} + \frac{\beta'}{w_b} + \frac{\gamma'}{w_c}} \\[3px]
\beta &= \frac{\frac{\beta'}{w_b}}{\frac{\alpha'}{w_a} + \frac{\beta'}{w_b} + \frac{\gamma'}{w_c}} \\[3px]
\gamma &= \frac{\frac{\gamma'}{w_c}}{\frac{\alpha'}{w_a} + \frac{\beta'}{w_b} + \frac{\gamma'}{w_c}} \\[3px]
\end{aligned}
$$
