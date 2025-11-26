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
[Allan Zucconi: Volumetric Atmospheric Scattering](https://www.alanzucconi.com/2017/10/10/atmospheric-scattering-1/)

### 透射函数 Transmittance Function
![](https://www.alanzucconi.com/wp-content/uploads/2017/09/scattering_11b-700x321.png)

$$
T(\overline{CP}) = \frac{I_P}{I_C}
$$

### 散射函数 Scattering Function
![](https://www.alanzucconi.com/wp-content/uploads/2017/10/scattering_06a-700x329.png)

$$
\begin{aligned}
I_{PA} &= \boxed{I_P}\,S(\lambda,\theta,h)\,T(\overline{PA}) \\[10px]
&= \boxed{I_C\,T(\overline{CP})}\,S(\lambda,\theta,h)\,T(\overline{PA}) \\[10px]
&= \underbrace{I_C\,S(\lambda,\theta,h)}_{in-scattering}\; \underbrace{T(\overline{CP})\,T(\overline{PA})}_{out_scattering}
\end{aligned}
$$

### 散射公式
![](https://www.alanzucconi.com/wp-content/uploads/2017/09/scattering_12-700x255.png)
$$
\begin{aligned}
I_A &= \sum_{P\in\overline{AB}} \boxed{I_{PA}}\,ds \\[10px]
&= \sum_{P\in\overline{AB}} \boxed{I_C\,S(\lambda,\theta,h)\,T(\overline{CP})\,T(\overline{PA})}\,ds \\[10px]
&= I_S\,\sum_{P\in\overline{AB}} S(\lambda,\theta,h)\,T(\overline{CP})\,T(\overline{PA})\,ds
\end{aligned}
$$

### Rayleigh 散射
$$
S(\lambda,\theta, h) = \frac{\pi^2(n^2-1)^2}{2}\,\underbrace{\frac{\rho(h)}{N}}_{density}\,\overbrace{\frac{1}{\lambda^4}}^{wavelength}\,\underbrace{1+cos^2\theta}_{geometry}
$$

其中：
- $\lambda$: 入射光的波长
- $\theta$: 散射角度
- $h$: 海拔高度
- $n=1.00029$：空气的折射率
- $N=2.504·10^{25}$：标准大气压下的分子数量密度
- $\rho(h)$：密度比，在海平面处等于 1

### Rayleigh 散射系数
$$
\beta(\lambda,h) = \frac{8\pi^3(n^2-1)^2}{3}\,\frac{\rho(h)}{N}\,\frac{1}{\lambda^4}
$$

::: details 数学推导
$$
\begin{aligned}
\beta(\lambda,h) &= \int_0^{2\pi}\int_0^\pi S(\lambda,\theta,h)\,sin\theta\,d\theta\,d\phi \\[10px]
&= \int_0^{2\pi}\int_0^\pi \underbrace{\frac{\pi^2(n^2-1)^2}{2}\frac{\rho(h)}{N}\frac{1}{\lambda^4}}_{constant}(1+cos^2\theta)\,sin\theta\,d\theta\,d\phi \\[10px]
&= \frac{\pi^2(n^2-1)^2}{2}\frac{\rho(h)}{N}\frac{1}{\lambda^4} \int_0^{2\pi} \boxed{\int_0^\pi (1+cos^2\theta)\,sin\theta\,d\theta}\,d\phi \\[10px]
&= \frac{\pi^2(n^2-1)^2}{2}\frac{\rho(h)}{N}\frac{1}{\lambda^4} \int_0^{2\pi} \boxed{\frac{8}{3}}\,d\phi \\[10px]
&= \frac{8\pi^3(n^2-1)^2}{3}\,\frac{\rho(h)}{N}\,\frac{1}{\lambda^4}
\end{aligned}
$$
:::

$$
\begin{aligned}
\beta(\lambda) = \beta(\lambda, 0) &= \frac{8\pi^3(n^2-1)^2}{3}\,\frac{1}{N}\,\frac{1}{\lambda^4} \\[20px]
\beta(680nm) &= 0.00000519673 \\[5px]
\beta(550nm) &= 0.0000121427 \\[5px]
\beta(440nm) &= 0.0000296453 \\
\end{aligned}
$$

### Rayleigh 相位函数
原始的 Rayleigh 散射函数可以分解成两部分，一个表示 Rayleigh 散射系数，另一个表示 Rayleigh 相位函数：
$$
S(\lambda,\theta,h) = \beta(\lambda,h)\,\gamma(\theta)
$$

则

$$
\begin{aligned}
\gamma(\theta) &= \frac{S(\lambda,\theta,h)}{\beta(\gamma)} \\[10px]
&= \underbrace{\frac{\pi^2(n^2-1)^2}{2}\frac{\rho(h)}{N}\frac{1}{\lambda^4}\,(1+cos^2\theta)}_{S(\lambda,\theta,h)}\,\underbrace{\frac{3}{8\pi^3(n^2-1)^2}\frac{N}{\rho(h)}\,\lambda^4}_{\frac{1}{\beta(\lambda)}} \\[10px]
&= \frac{3}{16\pi}(1+cos^2\theta)
\end{aligned}
$$

### 大气密度比
$$
\rho(h) = \frac{density(h)}{density(0)} = exp\Big\{-\frac{h}{H_0}\Big\}
$$

对于 Rayleigh 散射，$H_0 = 8500$ m；对于 Mie 散射， $H_0 = 1200$ m

### 大气透射
![](https://www.alanzucconi.com/wp-content/uploads/2017/09/scattering_10a-700x320.png)

$$
\begin{aligned}
I_P &= \boxed{I_Q}\,exp\{-\beta(\lambda,h_1)\overline{QP}\} \\
&= \boxed{I_S\,exp\{-\beta(\lambda,h_0)\overline{CQ}\}}\,exp\{-\beta(\lambda,h_1)\overline{QP}\} \\
&= I_S\,exp\{-\beta(\lambda,h_0)\overline{CQ} - \beta(\lambda,h_1)\overline{QP}\}
\end{aligned}
$$

如果 $\overline{CQ} = \overline{QP}$，则
$$
\begin{aligned}
I_P &= I_S\,exp\Big\{-\boxed{(\beta(\lambda,h_0)+\beta(\lambda,h_1))\,ds}\Big\} \\[10px]
&= I_S\,exp\Bigg\{-\boxed{\sum_{Q\in\overline{CP}} \beta(\lambda,h_Q)\,ds}\Bigg\}
\end{aligned}
$$

由此可得，
$$
\begin{aligned}
T(\overline{CP}) &= \frac{I_P}{I_S} = exp\Bigg\{-\sum_{Q\in\overline{CP}} \beta(\lambda,h_Q)\,ds\Bigg\} \\
&= exp\Bigg\{-\sum_{Q\in\overline{CP}} \beta(\lambda,0)\,\rho(h_Q)\,ds\Bigg\} \\
&= exp\Bigg\{-\beta(\lambda,0)\overbrace{\sum_{Q\in\overline{CP}} \rho(h_Q)\,ds}^{\text{optical depth } D(\overline{CP})}\Bigg\} \\
&= exp\{-\beta(\lambda)\,D(\overline{CP})\}
\end{aligned}
$$