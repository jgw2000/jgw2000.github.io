---
# 这是文章的标题
title: 纹理
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 4
# 设置作者
author: 被子
# 设置写作时间
date: 2024-10-31
# 一个页面可以有多个分类
category:
  - 实时渲染
# 一个页面可以有多个标签
tag:
  - 纹理
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 纹理放大

### 最近邻采样
![](/rtr/images/texture_1.png)

### 双线性插值采样
![](/rtr/images/texture_2.png)

## 纹理缩小
### Mipmapping
![](/rtr/images/texture_3.png)

<Badge text="LOD 计算（选用哪一层 mipmap ?）" type="tip" vertical="middle" />
![](/rtr/images/texture_4.png)
$$
\begin{aligned}
L_x^2 &= \left(\frac{du}{dx}\right)^2 + \left(\frac{dv}{dx}\right)^2 \\[3px]
L_y^2 &= \left(\frac{du}{dy}\right)^2 + \left(\frac{dv}{dy}\right)^2 \\[3px]
L &= \sqrt{max(L_x^2,L_y^2)}
\end{aligned}
$$

因此，L 表示在屏幕空间移动 1 个 pixel 的情况下，在纹理空间上大概移动多少个 texel，由此我们可以计算出应该选用哪一层 mipmap
$$
d = log_2 \, L
$$

假设 L = 1，则表示纹理既不放大也不缩小，因此选用 d = 0 层

### 三线性插值采样
![](/rtr/images/texture_5.png)

### 各向异性过滤采样
将图片按照 x 和 y 方向分别进行 downsampling
$$
(d_x,d_y) = \left(log_2\sqrt{L_x^2}, log_2\sqrt{L_y^2}\right)
$$
通过 d~x~ 和 d~y~ 找到对应的贴图