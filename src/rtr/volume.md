---
# 这是文章的标题
title: 体积渲染
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 7
# 设置作者
author: 被子
# 设置写作时间
date: 2025-11-09
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

## 光线散射理论
### 参与介质
![](/rtr/images/volume_1.png)

![](/rtr/images/volume_2.png)

媒介的反射率 $\rho$ 定义为：
$$
\rho = \frac{\sigma_s}{\sigma_s + \sigma_a} = \frac{\sigma_s}{\sigma_t}
$$

在参与介质的影响下，光在传播过程中的辐射度不再保持不变，某点的入射辐射度可以根据以下等式描述为（假设光源是无穷小的点光源）：
$$
L_i(c,-v) = T_r(c,p)L_o(p,v)+\int_{t=0}^{\|p-c\|} T_r(c,c-vt)L_{scat}(c-vt,v)\sigma_s dt
$$
![](/rtr/images/volume_3.png)

### 透射率
透射率 $T_r$ 表示有多少比例的光能够穿过一定距离的参与介质，根据 Beer-Lambert 定律可以表示为
$$
T_r(x_a, x_b) = e^{-\tau},\quad \text{where} \quad \tau = \int_{x=x_a}^{x_b} \sigma_t(x) \|dx\|
$$

![](/rtr/images/volume_4.png)

### 散射事件
$$
L_{scat}(x,v) = \pi\sum_{i=1}^n p(v,l_{c_i})\,v(x,p_{\text{light}_i})\,c_{\text{light}_i}(\|x-p_{\text{light}_i}\|)
$$
其中 <br>
$p$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表示相位函数<br>
$v$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表示可见性函数<br>
$l_{c_i}$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;表示到第 i 个点光源的方向<br>
$p_{\text{light}_i}$ 表示第 i 个点光源的位置<br>
$c_{\text{light}_i}$ &nbsp;表示第 i 个点光源的辐射度
<br><br>
可见性函数 $v(x,p_{\text{light}_i})$ 表示有多少光可以从点光源 $p_{\text{light}_i}$ 到达点 $x$ 处，可以表示为
$$
v(x,p_{\text{light}_i}) = \text{shadowMap}(x,p_{\text{light}_i})\cdot\text{volShad}(x,p_{\text{light}_i})
$$
其中<br>
shadowMap 表示来自不透明对象的遮挡，volShad 表示在 volume 中的透射率

::: tip
考虑 $\sigma_s=(0.5,1,2)$ 和 $\sigma_a=(0,0,0)$，当在介质中传播距离较短时，透射率 $T_r \approx 1$，此时散射事件将占据主导，材质将显示为蓝色；而当光越深入介质越少的光子可以通过，此时透射颜色将占据主导，材质将显示为红色。
:::

### 相位函数
![](/rtr/images/volume_5.png)
如图所示，相位函数在宏观层面上描述了散射方向的概率和分布，根据能量守恒原则，相位函数在单位球面上的积分必须等于 1；下面是最简单的相位函数，该函数是各向同性的，其在所有方向上均匀散射
$$
p(\theta) = \frac{1}{4\pi}
$$

基于物理的相位函数依赖于粒子的相对大小 $s_p$
$$
s_p = \frac{2\pi r}{\lambda}
$$

其中 $r$ 表示粒子半径，$\lambda$ 表示所考虑的光的波长

::: tip
当 $s_p \ll 1$ 时，会发生 Rayleigh 散射（例如空气）
:::

Rayleigh 散射的相位函数在极坐标下的图示如下，相对于光的方向有前向散射和后向散射两个部分

![](/rtr/images/volume_6.png)

具体可以表示为
$$
p(\theta) = \frac{3}{16\pi}(1+cos^2\theta)
$$

Rayleigh 散射具有强烈的波长依赖性，当作为波长 $\lambda$ 的函数来看时，其散射系数 $\sigma_s$ 与波长的四次方倒数成正比
$$
\sigma_s(\lambda) \propto \frac{1}{\lambda^4}
$$
这意味着短波长的蓝光或紫光比长波长的红光散射得更多，其光谱分布可以通过光谱的颜色匹配函数转换为 RGB 值 $\sigma_s = (0.490,1.017,2.339)$，该值被归一化为 1 的亮度，应该根据所需要的散射强度进行缩放。

::: tip
当 $s_p \approx 1$ 时，会发生 Mie 散射
:::

Mie 散射的相位函数通常是一种复杂的分布，对于特定的粒子大小来说，具有强烈而尖锐的方向性；而介质中的粒子尺寸一般具有连续的分布，对这些不同尺寸下的相位函数进行平均可以得到一个更平滑的相位函数，因此相对平滑的相位函数可以被用来表示 Mie 散射。
<br><br>
一种常用的相位函数是 Henyey-Greenstein (HG)，该函数可以很好地匹配朝向主要散射方向的部分，可以被用于表示烟、雾、尘埃等介质。这种介质可以表现出强烈的后向或前向散射，从而在光源周围产生较大的视觉光晕，例如雾气中的聚光灯以及太阳方向云层边缘强烈的银边效应。
<br><br>
HG 相位函数表示为
$$
p_{hg}(\theta, g) = \frac{1-g^2}{4\pi(1+g^2-2g\,cos\theta)^{1.5}}，\quad g \in[-1,1]
$$

g < 0 表示后向散射，g = 0 表示各向同性，g > 0 表示前向散射

![](/rtr/images/volume_7.png)

Schlick 相位函数是比 HG 更快的一个近似函数，表示为
$$
p(\theta,k) = \frac{1 - k^2}{4\pi(1 + k\,cos\theta)^2}, \quad k \approx 1.55g - 0.55g^3
$$

::: tip
当 $s_p \gg 1$ 时，会发生几何散射
:::

几何散射发生在粒子尺寸明显大于光的波长的情况下，此时，光可以在每个粒子内部发生折射和反射，在宏观层面上需要一个复杂的散射相位函数来模拟；光的偏振也会影响这种类型的散射，例如现实生活中的视觉彩虹效应，这种效应是由空气中水滴内部对光的反射引起的，它将太阳光分散成可见光谱，并在小角度的后向散射范围内形成可见的彩虹。

## 天空渲染
参考
<br>
[Display of The Earth Taking into Account Atmospheric Scattering](http://nishitalab.org/user/nis/cdrom/sig93_nis.pdf)
<br>
[GPU Gems2 : Accurate Atmospheric Scattering](https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-16-accurate-atmospheric-scattering)

### 大气散射
首先考虑单次散射的情况，假设 $I_0(\lambda)$ 表示入射光的强度，$I(\lambda,\theta)$ 表示经过粒子散射之后，在偏移 $\theta$ 角度的方向的出射光的强度，有：
$$
\begin{aligned}
I(\lambda,\theta) &= I_0(\lambda)\,K\rho\,F_r(\theta) / \lambda^4 \\[5px]
K&= \frac{2\pi^2(n^2-1)^2}{3N_s} \\[5px]
\end{aligned}
$$

::: info
$K$ 表示标准大气压下的常量（表示在海平面的分子密度），$n$ 表示空气的折射率，$N_s$ 表示标准大气压下的分子数量密度，$\rho$ 表示密度比并且依赖于海拔高度 $h$（$\rho = 1$ 表示在海平面）
$$
\rho = e^{-\frac{h}{H_0}}
$$
其中 $H_0$ 表示大气层的厚度（分子密度不变的情况下）, 气溶胶和空气分子的密度都是随着海拔高度而指数减少，但是减少的速度不同。气溶胶的大气层厚度 $H_0$ 可以设置成 1.2km，空气分子的大气层厚度 $H_0$ 可以设置成 7994m
:::

$F_r(\theta)$ 表示相位函数，下面是一种改进后的 HG 函数 
$$
F(\theta,g) = \frac{3(1-g^2)}{2(2+g^2)}\frac{(1+cos^2\theta)}{(1+g^2-2g\,cos\theta)^{3/2}}
$$

当 $g = 0$ 时等价于 Rayleigh 散射

衰减系数 $\beta$（即单位长度下的消光比）由以下公式给出：
$$
\beta = \frac{8\pi^3(n^2-1)^2}{3N_s\lambda^4} = \frac{4\pi K}{\lambda^4}
$$

为了计算波长为 $\lambda$ 的光在传输 $S$ 距离的过程中由于散射和吸收所导致的衰减，可以使用光学深度来进行，可以由以下公式表示：
$$
t(S,\lambda) = \int_0^S \beta(s)\,\rho(s)\,ds = \frac{4\pi K}{\lambda^4}\int_0^S\rho(s)\,ds
$$


### 公式和计算
假设地面某一处观察点 $P_v$，观察方向是 $v$，该视线与大气层的交点分别是 $P_a$ 和 $P_b$，考虑 $P_a$ 和 $P_b$ 之间任意一点 $P$，太阳光经过大气层衰减后到达 $P$ 点时的强度等于
$$
I_s(\lambda)\,e^{-t(PP_c,\lambda)}
$$
经过单次散射后在 $v$ 方向的出射光强度等于
$$
I_p(\lambda) = I_s(\lambda)\,e^{-t(PP_c,\lambda)}\,K\rho\,F_r(\theta)\frac{1}{\lambda^4}
$$
再经过大气层衰减到达观察点 $P_v$ 时的光强度等于
$$
I_{pv}(\lambda) = I_p(\lambda)\,e^{-t(PP_v, \lambda)}
$$

太阳光可以视为是平行光，对 $P_a$ 和 $P_b$ 之间进行积分可以得到总的光强度
$$
\begin{aligned}
I_v(\lambda) &= \int_{P_a}^{P_b} I_{pv}(\lambda)\,ds \\
&= \int_{P_a}^{P_b} I_s(\lambda)\,e^{-t(PP_c,\lambda)}\,K\rho\,F_r(\theta)\frac{1}{\lambda^4}\,e^{-t(PP_v,\lambda)}\,ds \\
&= I_s(\lambda)\frac{K\,F_r(\theta)}{\lambda^4}\int_{P_a}^{P_b}\rho\,e^{-t(PP_c,\lambda)-t(PP_v,\lambda)}\,ds
\end{aligned}
$$