---
# 这是文章的标题
title: 球谐函数
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 5
# 设置作者
author: 被子
# 设置写作时间
date: 2025-9-04
# 一个页面可以有多个分类
category:
  - 实时渲染
# 一个页面可以有多个标签
tag:

# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 背景
### 定义
球鞋函数在球面域 $S$ 上定义了一组标准正交基，使用参数 $s = (x,y,z) = (sin\theta\,cos\varphi,sin\theta\,sin\varphi,cos\theta)$，基函数定义为
$$
Y_l^m(\theta,\varphi) = K_l^m\,e^{im\varphi}\,P_l^{|m|}(cos\theta), \quad l \in N, \, -l \le m \le l
$$
其中 $P_l^m$ 表示拉格朗日多项式，$K_l^m$ 是归一化常数
$$
K_l^m = \sqrt{\frac{(2l+1)(l-|m|)!}{4\pi(l+|m|)!}}
$$
上述定义包含了虚数形式，对应的实数形式可以从以下变换得到
$$
y_l^m = \left\{\begin{array}{cl}
\sqrt{2}Re(Y_l^m) & m > 0 \\
\sqrt{2}Im(Y_l^m) & m < 0 \\
Y_l^0 & m = 0
\end{array}
\right.
= \left\{\begin{array}{cl}
\sqrt{2}K_l^m\,cos\,m\varphi\,P_l^m(cos\theta) & m > 0 \\
\sqrt{2}K_l^m\,sin|m|\varphi\,P_l^{|m|}(cos\theta) & m < 0 \\
K_l^0\,P_l^0(cos\theta) & m = 0
\end{array}
\right.
$$

### 投影和重构
球面域 $S$ 上的任意函数 $f$ 可以根据以下公式进行投影
$$
f_l^m = \int f(s)y_l^m(s)\,ds
$$
这些系数可以被用来重构 $f$ 的近似函数
$$
\tilde{f}(s) = \sum_0^n\sum_{m=-l}^l f_l^my_l^m(s)
$$

也可以用一个索引变量来表示
$$
\tilde{f}(s) = \sum_{i=0}^{n^2} f_i\,y_i(s)
$$
其中 $i=l(l+1)+m$, 例如 $n=2$时，$i = 0, 1, 2, 3$

### 基本性质
#### **旋转不变性**
给定一个函数 $g(s) = f(Q(s))$ （ 表示函数 $f(s)$ 通过矩阵 $Q$ 进行旋转 ），则函数 $g$（即 $f$ 旋转后）的投影等于对 $\tilde{f}$ 进行旋转；这意味着在旋转情况下光照也是稳定的，不会产生走样或者晃动。

#### **卷积**
给定一个具有圆对称性的核函数 $h(z)$，将该核函数和原函数 $f$ 卷积可以产生一个新的球谐函数，可以用以下公式在频率域进行卷积操作
$$
(h * f)_l^m = \sqrt{\frac{4\pi}{2l+1}}h_l^0f_l^m
$$

#### **Zonal Harmonics**
当函数的球谐投影绕某一个轴旋转对称时被称为 Zonal Harmonics，若这一个轴是 z 轴，则函数值等于 0 的部分会形成相同维度上的线且该函数只依赖于 $\theta$。此时该方向的投影在每一个 band 上只有一个非零系数。ZH 旋转比一般的 SH 更简单，给定一个函数的 ZH 系数 $z_l$（ SH 投影中 m = 0 部分 ），可以使用以下公式将其旋转到新的方向 $d$ 上
$$
f(s) = \sum_l z_l\sqrt{\frac{4\pi}{2l+1}}\sum_z y_l^m(d)\,y_l^m(s)
$$
对应的 SH 系数是
$$
f_l^m = \sqrt{\frac{4\pi}{2l+1}}z_l\,y_l^m(d)
$$

#### **SH 乘积**
使用 $n^{th}$ 重构表示的两个函数 $f$ 和 $g$ 的乘积投影后的 $k^{th}$ 系数等于
$$
p_k = \int y_k(s)\left(\sum_{i=0}^{n^2}f_i\,y_i(s)\right)\left(\sum_{j=0}^{n^2}g_j\,y_j(s)\right)ds = \sum_{ij}\Gamma_{ijk}f_i\,g_j
$$
其中
$$
\Gamma_{ijk} = \int y_i(s)\,y_j(s)\,y_k(s)\,ds
$$