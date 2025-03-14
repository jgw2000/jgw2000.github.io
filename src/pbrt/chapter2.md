---
# 这是文章的标题
title: 辐射度量学
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 2
# 设置作者
author: 被子
# 设置写作时间
date: 2025-3-11
# 一个页面可以有多个分类
category:
  - 光线追踪
# 一个页面可以有多个标签
tag:
  - 辐射度量学
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

:::tip
辐射度量学提供了一组思想和数学工具用来描述光的传播和反射，是渲染算法推导的基础。
:::

## 基本单位
### 能量 Energy
$$
Q = \frac{hc}{\lambda}
$$
其中 $c = 299,472,458$ m/s, $h \approx 6.626 x 10^{-34}$ m^2^kg/s

### 通量 Flux
:::tip
辐射通量，也称为功率，表示单位时间内通过某一表面或空间区域内的总能量
:::
$$
\Phi = \lim_{\Delta t \rightarrow 0} \frac{\Delta Q}{\Delta t} = \frac{dQ}{dt}
$$
相反，给定通量作为时间函数，我们可以通过对时间积分来计算总能量
$$
Q = \int_{t_0}^{t_1} \Phi(t) dt
$$

### 辐照度 Irradiance / 辐射出射度 Radiant Exitance
:::tip
给定一个有限区域 A，辐照度表示进入该区域的平均功率密度，辐射出射度表示离开该区域的平均功率密度
:::
$$
E = \frac{\Phi}{A}
$$
更一般地，可以通过极限计算在某一点 p 处的辐照度或辐射出射度
$$
E(p) = \lim_{\Delta A \rightarrow 0} \frac{\Delta\Phi(p)}{\Delta A} = \frac{d\Phi(p)}{dA}
$$
给定辐照度我们也可以通过对面积积分来计算通量
$$
\Phi = \int_A E(p) dA
$$

### 强度 Intensity
:::tip
考虑一个无限小的光源，强度表示该光源发射功率的角密度
:::
$$
I = \lim_{\Delta \omega \rightarrow 0} \frac{\Delta\Phi}{\Delta\omega} = \frac{d\Phi}{d\omega}
$$
同样地，给定强度作为方向函数 $I(\omega)$，我们可以通过对方向积分来计算通量
$$
\Phi = \int_\Omega I(\omega) d\omega
$$

### 辐射度 Radiance
:::tip
这是最后也是最重要的概念，表示单位面积单位方向的平均功率
:::
$$
L(p,\omega) = \lim_{\Delta\omega\rightarrow 0}\frac{\Delta E_\omega (p)}{\Delta\omega} = \frac{d E_\omega(p)}{d\omega}
$$
其中 $E_\omega$ 表示垂直于 $\omega$ 方向的表面上的辐照度，根据通量可以定义为
$$
L = \frac{d^2\Phi}{d\omega dA^\perp}
$$

### 辐射光谱分布
$$
L_\lambda = \lim_{\Delta\lambda\rightarrow 0}\frac{\Delta L}{\Delta\lambda} = \frac{dL}{d\lambda}
$$
通过对波长积分可以计算出辐射量
$$
L = \int_{\lambda_0}^{\lambda_1} L_\lambda(\lambda)d\lambda
$$

## 亮度 Luminance / 光度测定 Photometry
:::tip
所有辐射测量（如通量、辐射度等）都有相应的光度测量。光度测定是从人类视觉系统感知的角度研究可见电磁辐射。每个光谱辐射量都可以通过与光谱响应曲线积分转换为其相应的光度量，该曲线描述了人眼对各种波长的相对敏感度。
:::

:::tip
亮度衡量光谱功率分布在人类观察者眼中的亮度，定义为
$$
Y = \int_\lambda L_\lambda(\lambda) V(\lambda) d\lambda
$$
:::

所有其他的辐射度量都有对应的光度测量

![](/pbrt/images/chapter2_1.png)

## 辐射相关积分
![](/pbrt/images/chapter2_2.png)

$$
E(p, \emph{n}) = \int_\Omega L_i(p,\omega)|cos\theta|d\omega
$$

### 对投影立体角积分
![](/pbrt/images/chapter2_3.png)

$$
d\omega^\perp = |cos\theta|d\omega
$$

则有

$$
E(p, n) = \int_{H^2(\emph{n})} L_i(p,\omega) d\omega^{\perp}
$$

### 对球面坐标积分
![](/pbrt/images/chapter2_4.png)

$$
d\omega = sin\theta\;d\theta\;d\phi
$$

则有
$$
E(p, n) = \int_0^{2\pi} \int_0^{\pi / 2} L_i(p,\theta,\phi)\;cos\theta\;sin\theta\;d\theta\;d\phi
$$

### 对面积积分
![](/pbrt/images/chapter2_5.png)

$$
d\omega = \frac{dA cos\theta}{r^2}
$$

则有
$$
E(p, n) = \int_A L cos\theta_i \frac{cos\theta_o dA}{r^2}
$$

## 表面反射
### BRDF / BTDF
![](/pbrt/images/chapter2_6.png)

双向反射分布函数 BRDF 给出了描述表面反射的形式，给定入射方向 $\omega_i$，则点 p 处的微分辐照度为
$$
dE(p,\omega_i) = L_i(p,\omega_i) cos\theta_i d\omega_i
$$

一部分 radiance 将沿着方向 $\omega_o$ 反射出去，又因为几何光学的线性假设，被反射的辐射度和入射的辐照度成正比
$$
dL_o(p,\omega_o) \propto dE(p,\omega_i)
$$
这个比例常数定义了表面的 BDDF $f_r$
$$
f_r(p,\omega_o,\omega_i) = \frac{dL_o(p,\omega_o)}{dE(p,\omega_i)} = \frac{dL_o(p,\omega_o)}{L_i(p,\omega_i)cos\theta_i d\omega_i}
$$

:::tip
基于物理的 BRDF 具有两个重要性质：
1. $f_r(p,\omega_i,\omega_o) = f_r(p,\omega_o,\omega_i)$
2. 能量守恒：
$$
\int_{H^2(\emph{n})} f_r(p,\omega_o,\omega') cos\theta' d\omega' \le 1
$$
:::

:::tip 半球定向反射
描述了表面上某一点收到来自半球方向的常量光照后，反射到给定方向上的比例，定义为
$$
\rho_{hd}(\omega_o) = \int_{H^2(\emph{n})} f_r(p,\omega_o,\omega_i)|cos \theta_i| d\omega_i
$$
:::

双向透射分布函数 BTDF $f_t$ 描述了透射光的分布，定义和 BRDF 类似，BRDF 和 BTDF 可以统一定义为双向散射分布函数 BSDF $f$

:::tip 散射方程
$$
L_o(p,\omega_o) = \int_{S^2} f(p,\omega_o,\omega_i) L_i(p,\omega_i) |cos\theta_i| d\omega_i
$$
:::

:::tip 反射方程
$$
L_o(p,\omega_o) = \int_{H^2(\emph{n})} f(p,\omega_o,\omega_i) L_i(p,\omega_i) |cos\theta_i| d\omega_i
$$
:::

### BSSRDF
![](/pbrt/images/chapter2_7.png)

双向散射表面反射分布函数 BSSRDF 描述了经过次表面后的散射，定义为
$$
S(p_o,\omega_o,p_i,\omega_i) = \frac{dL_o(p_o,\omega_o)}{d\Phi(p_i,\omega_i)}
$$

一般形式的散射方程
$$
L_o(p_o,\omega_o) = \int_A \int_{H^(\emph{n})} S(p_o,\omega_o,p_i,\omega_i) L_i(p_i,\omega_i)|cos\theta_i|d\omega_i dA
$$