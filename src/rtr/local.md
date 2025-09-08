---
# 这是文章的标题
title: 局部光照
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

## 球谐函数
### 定义
球谐函数在球面域 $S$ 上定义了一组标准正交基，使用参数 
$$
s = (x,y,z) = (sin\theta\,cos\varphi,sin\theta\,sin\varphi,cos\theta)
$$
基函数定义为
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

## 环境映射
::: info 定义
环境映射将一个球面函数记录到一个或多个纹理中，可以表达任意高频率的球面信号（通过提高纹理分辨率）以及精确捕捉任意范围的环境辐射度（通过提高每个通道的位数）
:::

反射映射是其中最基本的一种，其假定 BRDF 是一个完美的镜面，反射方程可以简化为
$$
L_o(v) = F(n,r)L_i(r)
$$
由于输入辐射度 $L_i$ 只依赖于方向，因此可以存到一个二维表格中（即环境贴图），反射映射的算法具体步骤如下
- 生成环境贴图
- 对于每一个像素，计算物体表面该位置处的法线
- 根据观察方向 $v$ 和法线 $n$ 计算对应的反射方向 $r$
- 根据反射方向 $r$ 计算对应环境贴图中的索引，从而得到输入辐射度

::: caution 注意
环境映射不适用于平面的情况
:::

有很多投影函数可以将反射向量 $r$ 映射到环境贴图中

### 纬度-经度 映射
给定归一化的反射向量 $r=(r_x,r_y,r_z)$，可以计算出球面坐标 $(\rho,\phi)$，$\phi \in [0,2\pi)$ 表示经度，$\rho \in [0,\pi]$ 表示纬度
$$
\begin{aligned}
\rho &= arccos(r_z) \\
\phi &= atan2(r_y,r_x)
\end{aligned}
$$

### 球面映射
球面映射将反射向量投影到球面的二维贴图上（即球面贴图），具体计算步骤如下：
- 根据反射向量 $r$ 和观察方向 $v$ 计算出对应的球面法线 $n$, 在球面空间中 $v$ 固定等于 $(0,0,1)$， 则
  $$
  n = \frac{r + v}{\|r+v\|} = \left(\frac{r_x}{m}, \frac{r_y}{m}, \frac{r_z+1}{m}\right),\quad m = \sqrt{r_x^2+r_y^2+(r_z+1)^2}
  $$

- 假设球在原点且半径等于 1， 则该法线的坐标也是球面上该点 $h$ 的坐标，则 $(h_x,h_y)$ 表示了球面贴图上的一点，范围是 $[-1,1]$，将其映射到范围 $[0,1]$ 可得
  $$
  \begin{aligned}
  u &= \frac{r_x}{2m} + 0.5 \\
  v &= \frac{r_y}{2m} + 0.5
  \end{aligned}
  $$ 

::: caution 注意
球面贴图是从一个固定的方向来获取整个环境的视图，虽然也可以从新的观察方向来计算出对应的纹理坐标，然而这么做会产生视觉瑕疵，这是因为原球面贴图中的小部分在新的观察方向下被放大了。
:::

### 立方体映射
可以直接使用反射向量 $r=(r_x,r_y,r_z)$ 作为纹理坐标进行访问

## IBL
当使用环境贴图来表示环境光时，需要使用渲染方程积分来计算光照信息，可以用蒙特卡洛估计
$$
\int_H L_i(l)\,f(l,v)\,cos\theta_l\,dl \approx \frac{1}{N}\sum_{k=1}^N \frac{L_i(l_k)\,f(l_k,v)\,cos\theta_{l_k}}{p(l_k,v)}
$$

即使使用重要性采样，该方法仍然需要很多次采样计算，为了进一步减少计算代价，可以使用 Split Sum 近似

::: info
一个重要的近似公式
$$
\int_\Omega f(x)\,g(x)\,dx \approx \underbrace{\frac{\int_{\Omega_G} f(x)\,dx}{\int_{\Omega_G} dx}}_{f\,在积分域\, \Omega_G\,的平均值} \cdot \int_\Omega g(x)\,dx
$$

在什么情况下是准确的？
- 积分域 $\Omega_G$ 足够小
- 函数 $g$ 在积分域 $\Omega_G$ 上足够光滑（即变化波动小）

BRDF 恰好满足条件！
:::

::: tip Split Sum 近似
$$
\frac{1}{N}\sum_{k=1}^N \frac{L_i(l_k)\,f(l_k,v)\,cos\theta_{l_k}}{p(l_k,v)} \approx \left(\frac{1}{N}\sum_{k=1}^N L_i(l_k)\right)\,\left(\frac{1}{N}\sum_{k=1}^N \frac{f(l_k,v)\,cos\theta_{l_k}}{p(l_k,v)}\right)
$$
:::

### Sepcular IBL
如果 BRDF 是 glossy 的，此时满足条件积分域 $\Omega_G$ 足够小，则有
$$
\int_H L_i(l)\,f(l,v)\,cos\theta_l\,dl \approx \underbrace{\frac{\int_{H}L_i(l)\,dl}{dl}}_{对环境贴图作\, prefilter} \underbrace{\int_H f(l,v)\,cos\theta_l\,dl}_{预计算 \,LUT}
$$

$$
\begin{aligned}
\int_H f(l,v)\,cos\theta_l\,dl &= F_0\int_H\frac{f(l,v)}{F(v,h)}\Big(1 - (1 - v\cdot h)^5\Big)\,cos\theta_l\,dl + \int_H \frac{f(l,v)}{F(v,h)}(1-v\cdot h)^5\,cos\theta_l\,dl \\
& \approx F_0\,\Big(\frac{1}{N}\sum_{k=1}^N \frac{D(h_k)\cdot G(l_k,v)\cdot (1 - (1 - v\cdot h)^5)\,|n\cdot l|}{4|n\cdot l||n\cdot v|\,p(l_k,v)}\Big) + \frac{1}{N}\sum_{k=1}^N \frac{D(h_k)\cdot G(l_k,v)\cdot (1 - v\cdot h)^5\,|n\cdot l|}{4|n\cdot l||n\cdot v|\,p(l_k,v)}
\end{aligned}
$$

我们使用重要性采样 $D(h)|n\cdot h|$，这是因为
$$
\int_\Omega D(h)|n\cdot h|\,dh = 1
$$

又我们要对 $l$ 进行采样而不是 $h$ ，因此需要使用 Jacobian 变换
$$
J(h) = \frac{1}{4|v\cdot h|}
$$

可得
$$
pdf(l_k,v) = \frac{D(h)|n\cdot h|}{4|v\cdot h|}
$$

代入上式
::: tip
$$
\int_H f(l,v)\,cos\theta_l\,dl \approx F_0\,\Big(\frac{1}{N}\sum_{k=1}^N \frac{G(l_k,v)\cdot|v\cdot h|\cdot (1 - (1 - v\cdot h)^5)}{|n\cdot h||n\cdot v|}\Big) + \frac{1}{N}\sum_{k=1}^N\frac{G(l_k,v)\cdot|v\cdot h|\cdot(1-v\cdot h)^5}{|n\cdot h||n\cdot v|}
$$
:::


参考
<br>
[Real Shading in Unreal Engine 4](https://blog.selfshadow.com/publications/s2013-shading-course/karis/s2013_pbs_epic_notes_v2.pdf)
<br>
[Image Based Lighting with Multiple Scattering](https://bruop.github.io/ibl/)