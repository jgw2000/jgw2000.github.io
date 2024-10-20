---
# 这是文章的标题
title: 坐标变换
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 被子
# 设置写作时间
date: 2024-09-07
# 一个页面可以有多个分类
category:
  - 实时渲染
# 一个页面可以有多个标签
tag:
  - 坐标变换
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 线性代数基础
任意 n 阶段矩阵 M 可以看成由 n 个列向量 c<sub>1</sub> c<sub>2</sub> ... c<sub>n</sub> 组成：
$$
M =
\begin{bmatrix}
\mathbf{c_1} & \mathbf{c_2} & ... & \mathbf{c_n} \\
\end{bmatrix}
$$
将这 n 个列向量进行线性变换后所能表示的向量记为 v 有：
$$
v = k_1\mathbf{c_1}+k_2\mathbf{c_2}+...+k_n\mathbf{c_n}
$$
所有 v 构成的向量空间记为 R

::: info
### 秩
表示由矩阵的列向量所能构成的向量所组成的向量空间 R 的维度

### 行列式
表示该矩阵对空间进行变换的缩放程度，例如，2 阶矩阵表示面积的缩放，3 阶矩阵表示体积的缩放
如果行列式为 0，表示该矩阵变换进行了降维操作(即秩⬇)，因此此时矩阵不可逆
如果行列式 < 0，表示该矩阵变换进行了翻转操作
:::

## 基本变换
::: info 线性变换定义
$$
\begin{aligned}
f(x)+f(y) &= f(x+y) \\
kf(x) &= f(kx)
\end{aligned}
$$
对于任意矩阵 M 以及向量 x y 满足： <br>
Mx + My = M(x+y) <br>
kM(x) = M(kx) <br>
因此 M 也满足线性变换

:::

### 平移
![](/rtr/images/transform_1.png)
$$
\mathbf{T}(\mathbf{t}) = \mathbf{T}(t_x,t_y,t_z) =
\begin{pmatrix}
1 & 0 & 0 & t_x \\
0 & 1 & 0 & t_y \\
0 & 0 & 1 & t_z \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

### 旋转
$$
\mathbf{R}_x(\phi) =
\begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & cos\phi & -sin\phi & 0 \\
0 & sin\phi & cos\phi & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$
$$
\mathbf{R}_y(\phi) =
\begin{pmatrix}
cos\phi & 0 & sin\phi & 0 \\
0 & 1 & 0 & 0 \\
-sin\phi & 0 & cos\phi & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$
$$
\mathbf{R}_z(\phi) =
\begin{pmatrix}
cos\phi & -sin\phi & 0 & 0 \\
sin\phi & cos\phi & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

::: info 定理
任意 3x3 旋转矩阵都是标准正交矩阵，且行列式等于 1

#### 推导
给定由一组标准正交基所组成的矩阵 A 以及任意 3x3 旋转矩阵 R，其旋转之后仍然是一组标准正交基，可得：
$$
(RA)(RA)^T=RAA^TR^T = RR^T=I
$$
:::

### 缩放
$$
\mathbf{S}(\mathbf{s}) =
\begin{pmatrix}
s_x & 0 & 0 & 0 \\
0 & s_y & 0 & 0 \\
0 & 0 & s_z & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

### 剪切
![](/rtr/images/transform_2.png)
$$
\mathbf{H}_{xz}(s) =
\begin{pmatrix}
1 & 0 & s & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

## 视图变换
![](/rtr/images/transform_3.png)
> 如图，假定相机位置在 **c**，单位向量 **r**，**u**，**v** 表示相机的旋转朝向
::: tip
由于相机和物体之间的相对位置是固定不变的，我们可以先对整体一起进行矩阵变换，使得相机位于原点且朝向从 <**r**，**u**，**v**> 变换为 <**x**，**y**，**z**> （当然也可以变换为 **x**，**y**，**-z**）
:::
1. 先将相机平移到原点
$$
T_{view} =
\begin{pmatrix}
1 & 0 & 0 & -t_x \\
0 & 1 & 0 & -t_y \\
0 & 0 & 1 & -t_z \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

2. 将朝向从 <**r**，**u**，**v**> 变换为 <**x**，**y**，**z**>
::: tip
可以单独考虑每个向量，我们希望通过一个旋转矩阵变换将 **r** → **x**（<1,0,0>）, **u** → **y**（<0,1,0>）, **v** → **z**（<0,0,1>），因为 **r**，**u**，**v** 是标准正交向量，所以 **r**·**r** = **u**·**u** = **v**·**v** = 1，且两两之间的点积为 0
:::
综上，可以推导出对应的旋转矩阵
$$
R_{view} =
\begin{pmatrix}
\mathbf{r}^T & 0 \\
\mathbf{u}^T & 0 \\
\mathbf{v}^T & 0 \\
0 & 1
\end{pmatrix}
=
\begin{pmatrix}
r_x & r_y & r_z & 0 \\
u_x & u_y & u_z & 0 \\
v_x & v_y & v_z & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
$$

3. 视图变换矩阵
$$
\begin{aligned}
M_{view} = R_{view} T_{view} &=
\begin{pmatrix}
r_x & r_y & r_z & 0 \\
u_x & u_y & u_z & 0 \\
v_x & v_y & v_z & 0 \\
0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
1 & 0 & 0 & -t_x \\
0 & 1 & 0 & -t_y \\
0 & 0 & 1 & -t_z \\
0 & 0 & 0 & 1
\end{pmatrix} \\
&=
\begin{pmatrix}
r_x & r_y & r_z & -\mathbf{t}\cdot\mathbf{r} \\
u_x & u_y & u_z & -\mathbf{t}\cdot\mathbf{u} \\
v_x & v_y & v_z & -\mathbf{t}\cdot\mathbf{v} \\
0 & 0 & 0 & 1
\end{pmatrix}
\end{aligned}
$$

## 投影矩阵
### 正交投影
![](/rtr/images/transform_4.png)
::: tip
正交投影的目标是将由（l,r,b,t,n,f）所表示的 AABB 变换到以原点为中心的标准 AABB，在 OpenGL 中标准 AABB 为 (-1,-1,-1) - (1,1,1)，在 DirectX 中标准 AABB 为 (-1,-1,0) - (1,1,1)
:::

::: caution 注意
上图中相机看向 -z 的方向，因此有 ==0 > n > f==； 如果相机看向 +z 的方向，那么 ==0 < n < f==，并且投影矩阵公式也会有所不同，以下公式推导基于相机看向 ==+z== 方向
:::

#### OpenGL
$$
\begin{aligned}
\mathbf{P}_{o[-1,1]} = \mathbf{S}(\mathbf{s})\mathbf{T}(\mathbf{t}) &=
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & 0 \\[3px]
0 & \frac{2}{t - b} & 0 & 0 \\[3px]
0 & 0 & \frac{2}{f - n} & 0 \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
1 & 0 & 0 & -\frac{l + r}{2} \\[3px]
0 & 1 & 0 & -\frac{b + t}{2} \\[3px]
0 & 0 & 1 & -\frac{n + f}{2} \\[3px]
0 & 0 & 0 & 1
\end{pmatrix} \\
&=
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & \frac{l + r}{l - r} \\[3px]
0 & \frac{2}{t - b} & 0 & \frac{b + t}{b - t} \\[3px]
0 & 0 & \frac{2}{f - n} & \frac{n + f}{n - f} \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
\end{aligned}
$$

#### DirectX
$$
\begin{aligned}
\mathbf{P}_{o[0,1]} = \mathbf{M}_{st}\mathbf{P}_{o[-1,1]} &=
\begin{pmatrix}
1 & 0 & 0 & 0 \\[3px]
0 & 1 & 0 & 0 \\[3px]
0 & 0 & 0.5 & 0.5 \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & \frac{l + r}{l - r} \\[3px]
0 & \frac{2}{t - b} & 0 & \frac{b + t}{b - t} \\[3px]
0 & 0 & \frac{2}{f - n} & \frac{n + f}{n - f} \\[3px]
0 & 0 & 0 & 1
\end{pmatrix} \\
&= \begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & \frac{l + r}{l - r} \\[3px]
0 & \frac{2}{t - b} & 0 & \frac{b + t}{b - t} \\[3px]
0 & 0 & \frac{1}{f - n} & \frac{n}{n - f} \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
\end{aligned}
$$

### 透视投影
![](/rtr/images/transform_6.png)
::: tip
透视投影的目标是将由（l,r,b,t,n,f）所表示的视锥体变换到以原点为中心的标准 AABB，在 OpenGL 中标准 AABB 为 (-1,-1,-1) - (1,1,1)，在 DirectX 中标准 AABB 为 (-1,-1,0) - (1,1,1)
:::

::: caution 注意
上图中相机看向 -z 的方向，因此有 ==0 > n > f==； 如果相机看向 +z 的方向，那么 ==0 < n < f==，并且投影矩阵公式也会有所不同，以下公式推导基于相机看向 ==-z== 方向
:::

直接计算这个变化有困难，可以考虑分成两步

::: info 第一步
将由（l,r,b,t,n,f）所表示的视锥体变换到由（l,r,b,t,n,f）所表示的 AABB，即把视锥体往中间压缩成一个长方体，且保持近平面和远平面的距离不变
:::

![](/rtr/images/transform_5.png)

<Badge text="i. 推导矩阵信息" type="tip" vertical="middle" />

任意点 p(x, y, z) 投影到近平面上的位置为 q(nx/z, ny/z, n)，我们取 q<sub>x</sub> 和 q<sub>y</sub> 作为压缩后的 x 和 y，而压缩之后的 z 暂且不管，即我们要求一个矩阵变换，使得：
$$
\begin{pmatrix}
x \\
y \\
z \\
1
\end{pmatrix}
\Rightarrow
\begin{pmatrix}
nx/z \\
ny/z \\
? \\
1
\end{pmatrix}
==
\begin{pmatrix}
nx \\
ny \\
? \\
z
\end{pmatrix}
$$

据此，可以推导出该矩阵的一部分信息

$$
M_{persp\rightarrow ortho} =
\begin{pmatrix}
n & 0 & 0 & 0 \\
0 & n & 0 & 0 \\
? & ? & ? & ? \\
0 & 0 & 1 & 0
\end{pmatrix}
$$

<Badge text="ii. 计算矩阵第三行元素" type="tip" vertical="middle" />

我们可以知道，在近平面和远平面上的点，经过压缩变换之后 z 坐标的值保持不变，即
$$
\begin{pmatrix}
x \\
y \\
n \\
1
\end{pmatrix}
\Rightarrow
\begin{pmatrix}
x \\
y \\
n \\
1
\end{pmatrix}
==
\begin{pmatrix}
nx \\
ny \\
n^2 \\
n
\end{pmatrix}
$$

$$
\begin{pmatrix}
x \\
y \\
f \\
1
\end{pmatrix}
\Rightarrow
\begin{pmatrix}
x \\
y \\
f \\
1
\end{pmatrix}
==
\begin{pmatrix}
fx \\
fy \\
f^2 \\
f
\end{pmatrix}
$$

其中 x, y 是变量，而 n 是常量和 x, y 无关，因此矩阵第三行一定是 (0 0 A B) 的形式，因此有
$$
\begin{aligned}
An + B = n^2 \\
Af + B = f^2
\end{aligned}
\,\Rightarrow\,
\begin{aligned}
A &= n + f \\
B &= -nf
\end{aligned}
$$

综上

$$
M_{persp\rightarrow ortho} =
\begin{pmatrix}
n & 0 & 0 & 0 \\
0 & n & 0 & 0 \\
0 & 0 & n+f & -nf \\
0 & 0 & 1 & 0
\end{pmatrix}
$$

::: info 第二步
将由（l,r,b,t,n,f）所表示的 AABB 变换到以原点为中心的标准 AABB，在 OpenGL 中标准 AABB 为 (-1,-1,-1) - (1,1,1)，在 DirectX 中标准 AABB 为 (-1,-1,0) - (1,1,1)
:::

==这一步其实就是前面正交投影变换的过程！==

#### OpenGL
$$
M_{ortho} =
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & \frac{l + r}{l - r} \\[3px]
0 & \frac{2}{t - b} & 0 & \frac{b + t}{b - t} \\[3px]
0 & 0 & \frac{2}{f - n} & \frac{n + f}{n - f} \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
$$

#### DirectX
$$
M_{ortho} =
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & \frac{l + r}{l - r} \\[3px]
0 & \frac{2}{t - b} & 0 & \frac{b + t}{b - t} \\[3px]
0 & 0 & \frac{1}{f - n} & \frac{n}{n - f} \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
$$

::: info 第三步
$$
P = M_{ortho}\cdot M_{persp\rightarrow ortho}
$$
:::

#### OpenGL
$$
\begin{aligned}
\mathbf{P}_{p[-1,1]} = M_{ortho}\cdot M_{persp\rightarrow ortho} &=
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & \frac{l + r}{l - r} \\[3px]
0 & \frac{2}{t - b} & 0 & \frac{b + t}{b - t} \\[3px]
0 & 0 & \frac{2}{f - n} & \frac{n + f}{n - f} \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
n & 0 & 0 & 0 \\
0 & n & 0 & 0 \\
0 & 0 & n+f & -nf \\
0 & 0 & 1 & 0
\end{pmatrix} \\
&=
\begin{pmatrix}
\frac{2n}{r - l} & 0 & \frac{l+r}{l-r} & 0 \\[3px]
0 & \frac{2n}{t - b} & \frac{b+t}{b-t} & 0 \\[3px]
0 & 0 & -\frac{n + f}{n - f} & \frac{2nf}{n - f} \\[3px]
0 & 0 & 1 & 0
\end{pmatrix}
\end{aligned}
$$

#### DirectX
$$
\begin{aligned}
\mathbf{P}_{p[0,1]} = M_{ortho}\cdot M_{persp\rightarrow ortho} &=
\begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & \frac{l + r}{l - r} \\[3px]
0 & \frac{2}{t - b} & 0 & \frac{b + t}{b - t} \\[3px]
0 & 0 & \frac{1}{f - n} & \frac{n}{n - f} \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
\begin{pmatrix}
n & 0 & 0 & 0 \\
0 & n & 0 & 0 \\
0 & 0 & n+f & -nf \\
0 & 0 & 1 & 0
\end{pmatrix} \\
&=
\begin{pmatrix}
\frac{2n}{r - l} & 0 & \frac{l+r}{l-r} & 0 \\[3px]
0 & \frac{2n}{t - b} & \frac{b+t}{b-t} & 0 \\[3px]
0 & 0 & -\frac{f}{n - f} & \frac{nf}{n - f} \\[3px]
0 & 0 & 1 & 0
\end{pmatrix}
\end{aligned}
$$


---

::: info
经过投影变换后，从相机坐标空间转换为 [NDC](## "Normalized Device Coordinates") 坐标空间
:::

## 视口变换
::: tip
视口变换的目标是将 xy 坐标从 [-1, 1] x [-1, 1] 变换到 [0, width] x [0, height]，z 坐标保持不变
:::

$$
M_{viewport} =
\begin{pmatrix}
\frac{width}{2} & 0 & 0 & \frac{width}{2} \\[3px]
0 & \frac{height}{2} & 0 & \frac{height}{2} \\[3px]
0 & 0 & 1 & 0 \\[3px]
0 & 0 & 0 & 1
\end{pmatrix}
$$