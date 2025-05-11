---
# 这是文章的标题
title: 反射模型
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 5
# 设置作者
author: 被子
# 设置写作时间
date: 2025-3-23
# 一个页面可以有多个分类
category:
  - 光线追踪
# 一个页面可以有多个标签
tag:
  - BSDF
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---
## 漫反射
:::tip Lambertian 漫反射模型
这是最简单的 BRDF 模型之一，描述了一个完美的漫反射表面，入射光经过该表面向各个方向反射的辐射度都相同。反射率 albedo 定义如下
$$
\rho_{albedo} = \int_{H^2(n)} f_r(p,\omega_o,\omega_i) \; cos\theta_i \; d\omega_i
$$
其表示半球上的==常量==入射光经过物体表面反射到某一==给定==方向 $\omega_o$ 上的比例，又根据 BRDF 的可逆性，也等价于表示某一==给定==方向的入射光经过物体表面反射到整个==半球==面上的比例
<br><br>
又因为 $f_r(p,\omega_o,\omega_i)$ 是常量，可得
$$
f_r(p,\omega_o,\omega_i) = \frac{\rho_{albedo}}{\pi}
$$
:::

### 均匀采样单位圆
单位圆的面积等于 $\pi$，因此根据面积均匀采样的 PDF $p(x,y) = 1/\pi$，变换到极坐标后可得 $p(r,\theta) = r/\pi$，我们可以计算边际和条件概率密度：
$$
\begin{aligned}
p(r) &= \int_0^{2\pi} p(r,\theta)\,d\theta = 2r \\
p(\theta|r) &= \frac{p(r,\theta)}{p(r)} = \frac{1}{2\pi}
\end{aligned}
$$

CDF 等于
$$
\begin{aligned}
P(r) &= \int_0^r 2r'dr' = r^2 \\
P(\theta|r) &= \int_0^\theta \frac{1}{2\pi} d\theta' = \frac{\theta}{2\pi}
\end{aligned}
$$

根据反转方法采样，可得
:::tip
$$
\begin{aligned}
r &= \sqrt{\xi_1} \\
\theta &= 2\pi\xi_2
\end{aligned}
$$
:::

虽然该映射方法可以解决问题，但是如下图所示会扭曲在圆上的面积

<div align=center>
<img src=/pbrt/images/chapter5_1.png style="zoom:70%"/>
</div>

同心映射可以解决扭曲的问题

<div align=center>
<img src=/pbrt/images/chapter5_2.png style="zoom:70%"/>
</div>

例如上图中阴影区域通过以下公式映射到 $(r,\theta)$

$$
\begin{aligned}
r &= x \\
\theta &= \frac{y}{x} \frac{\pi}{4}
\end{aligned}
$$

<div align=center>
<img src=/pbrt/images/chapter5_3.png style="zoom:70%"/>
</div>

```C++
Point2f SampleUniformDiskConcentric(Point2f u) {
    // 将 u 映射到 [-1, 1]x[-1, 1] 并且处理原点处的退化
    Point2f uOffset = 2 * u - Vector2f(1, 1);
    if (uOffset.x == 0 && uOffset.y == 0)
        return {0, 0};
    
    // 应用同心映射
    Float theta, r;
    if (std::abs(uOffset.x) > std::abs(uOffset.y)) {
        r = uOffset.x;
        theta = PiOver4 * (uOffset.y / uOffset.x);
    } else {
        r = uOffset.y;
        theta = PiOver2 - PiOver4 * (uOffset.x / uOffset.y);
    }
    return r * Point2f(std::cos(theta), std::sin(theta));
}
```

### 均匀采样半球面
单位半球面的面积是 $2\pi$，因此均匀采样半球面的 PDF $p(\omega) = 1 / (2\pi)$，下面使用球面坐标来推导采样算法：
<br><br>
由于
$$
p(r,\theta,\phi) = r^2 sin\theta \; p(x,y,z)
$$
则
$$
p(\theta,\phi) = sin\theta / (2\pi)
$$
该密度函数是可分离的，因为 $\phi$ 的范围是 $0$ - $2\pi$ 并且 $p(\phi) = 1 / (2\pi)$，因此 $p(\theta) = sin\theta$。这两个的 CDF 等于
$$
\begin{aligned}
P(\theta) &= \int_0^\theta sin\theta' d\theta' = 1 - cos\theta \\
P(\phi) &= \int_0^\phi \frac{1}{2\pi} d\phi' = \frac{\phi}{2\pi}
\end{aligned}
$$

根据反转方法采样，获取均匀分布的随机数 $\xi_1 \in [0,1]$ （并取 $\xi_1 = 1 - \xi_1$）和 $\xi_2 \in [0,1]$，通过求逆可得采样的值等于
$$
\begin{aligned}
\theta &= cos^{-1}\xi_1 \\
\phi &= 2\pi\xi_2
\end{aligned}
$$

转换回笛卡尔坐标系，得到最终的采样公式：
:::tip
$$
\begin{aligned}
x &= sin\theta\;cos\phi = cos(2\pi\xi_2)\sqrt{1-\xi_1^2} \\
y &= sin\theta\;sin\phi = sin(2\pi\xi_2)\sqrt{1-\xi_1^2} \\
z &= cos\theta = \xi_1
\end{aligned}
$$
:::

### 余弦加权采样半球面 Cosine-Weighted
许多光传输积分公式包含一个余弦因子，根据重要性采样性质，有一种根据半球面的余弦加权分布生成方向的方法会很有用，该方法会更有可能采样得到接近球顶附近的方向。从数学上来讲，这意味着
$$
p(\omega) \propto cos\theta
$$

进行归一化
$$
\begin{aligned}
\int_H^2 p(\omega) d\omega &= 1 \\
\int_0^{2\pi}\int_0^{\frac{\pi}{2}} c\,cos\theta\,sin\theta\,d\theta\,d\phi &= 1 \\
c\,2\pi\int_0^{\pi/2} cos\theta\,sin\theta\,d\theta &= 1 \\
c &= \frac{1}{\pi}
\end{aligned}
$$

因此
$$
p(\omega) = \frac{1}{\pi} cos\theta
$$

我们可以是使用 Malley 方法来采样该分布

![](/pbrt/images/chapter5_4.png)
:::info Malley 方法
从单位圆中均匀采样点，然后将该点向上投影到半球面上，如此获得的采样点即满足余弦加权分布
:::

## 镜面反射和透射
### 折射率
:::info 定义
通常用折射率 IOR 来概括光的速度降低，例如，光遇到折射率等于 2 的材质表面后速度会降为原来的一半。折射率的范围通常在 1.0 - 2.5 之间且随光的波长而变化，用希腊字母 $\eta$ 表示。
<br><br>
当光遇到 IOR 值突然变化的边界时会发生明显的反射，折射率 $\eta$ 控制了表面的外观表现，因此对于该值的良好估计对于基于物理的渲染非常重要。
:::

![](/pbrt/images/chapter5_5.png)

### 镜面反射定律
给定入射光的方向 $(\theta_i,\phi_i)$，完美镜面的反射方向 $(\theta_r,\phi_r)$ 满足以下性质：
$$
\begin{aligned}
\theta_r &= \theta_i \\
\phi_r &= \phi_i + \pi
\end{aligned}
$$

也可以使用向量来计算

<div align=center>
<img src=/pbrt/images/chapter5_6.png style="zoom:70%"/>
</div>

<div align=center>
<img src=/pbrt/images/chapter5_7.png style="zoom:70%"/>
</div>

### 斯涅尔定律 Snell's Law
:::info 定义
斯涅尔定律描述了光的入射方向 $(\theta_i,\phi_i)$ 和透射方向 $(\theta_t,\phi_t)$ 之间的关系，依赖于边界两边介质的折射率 $\eta_i$ 和 $\eta_t$，满足如下性质：
$$
\begin{aligned}
\eta_i \, sin\theta_i &= \eta_t \, sin\theta_t \\
\phi_t &= \phi_i + \pi
\end{aligned}
$$
:::

<div align=center>
<img src=/pbrt/images/chapter5_8.png style="zoom:70%"/>
</div>

一个有用的观察：斯涅尔定律不依赖于具体的 $\eta_i$ 和 $\eta_t$ 的值，而是他们的比值，因此该定律也可以写成
$$
sin\theta_i = \eta \, sin\theta_t
$$
其中 $\eta = \frac{\eta_t}{\eta_i}$ 表示相对折射率

同样也可以使用向量来计算

<div align=center>
<img src=/pbrt/images/chapter5_9.png style="zoom:70%"/>
</div>

### 菲涅尔等式
$$
\begin{aligned}
r_{\|} = \frac{\eta_t \, cos\theta_i - \eta_i \, cos\theta_t}{\eta_t \, cos\theta_i + \eta_i \, cos\theta_t} \\[10px]
r_{\perp} = \frac{\eta_i \, cos\theta_i - \eta_t \, cos\theta_t}{\eta_i \, cos\theta_i + \eta_t \, cos\theta_t}
\end{aligned}
$$

同样也可以用相对折射率来表示
$$
r_{\|} = \frac{\eta \, cos\theta_i - cos\theta_t}{\eta \, cos\theta_i + cos\theta_t}, \quad \quad r_{\perp} = \frac{cos\theta_i - \eta \, cos\theta_t}{cos\theta_i + \eta \, cos\theta_t}
$$

菲涅尔反射
$$
F_r = \frac{1}{2} (r_{\|}^2 + r_{\perp}^2)
$$

::: tip
导体的折射率 IOR 是一个复数，其中实数部分和之前一样描述光的速度降低，而虚数部分描述光在导体内部传播过程中的衰减。这个衰减非常快，对反射的多少也有显著影响，因此我们也必须考虑这个因素。
<br><br>
导体的折射率可以表示为 $\eta - ik$，其中 $k$ 表示吸收系数，入射和出射光都可以用平面波来建模描述随时间和距离 z 而变化的震荡，例如
$$
\begin{aligned}
E(z) = e^{-i\alpha(\eta - ik) z} = e^{-i\alpha\eta z} e^{-\alpha kz}
\end{aligned}
$$
其实数部分等于
$$
e^{-\alpha kz} cos(\alpha\eta z)
$$

下图是黄金的折射率和吸收系数（都依赖于光的波长）

![](/pbrt/images/chapter5_11.png)
:::

## 导体 BRDF
:::warning
暂时只考虑完美反射的情况
:::

::: info
导体 BRDF 基于两个物理概念：镜面反射定律决定每条光线的反射方向，以及菲涅尔等式决定反射光的比例。剩余的光会折射到导体中，被快速吸收并转化为热量。
:::

令 $F_r(\omega)$ 表示来自 $\omega$ 方向光的菲涅尔反射比例，我们需要求解 BRDF $f_r$ 使得满足以下等式：
$$
L_o(\omega_o) = \int_{H^2(n)} f_r(\omega_o,\omega_i) L_i(\omega_i)|cos\theta_i|d\omega_i = F_r(\omega_r)L_i(\omega_r)
$$

根据 Dirac delta 分布性质
$$
\int f(x)\delta(x-x_0) dx = f(x_0)
$$

可以猜测导体 BRDF 等于
$$
f_r(\omega_o,\omega_i) = \delta(\omega_i - \omega_r) F_r(\omega_i)
$$

代入可得
$$
\begin{aligned}
L_o(\omega_o) &= \int_{H^2(n)} \delta(\omega_i-\omega_r) F_r(\omega_i) L_i(\omega_i) |cos\theta_i| d\omega_i \\
&= F_r(\omega_r)L_i(\omega_r)|cos\theta_r|
\end{aligned}
$$

综上

:::tip 导体 BRDF
$$
f_r(p,\omega_o,\omega_i) = F_r(\omega_r)\frac{\delta(\omega_i-\omega_r)}{|cos\theta_r|}
$$
:::

## 电介质 BSDF

![](/pbrt/images/chapter5_10.png)

:::warning
暂时只考虑完美反射和折射的情况
:::

:::info
电介质的相对折射率是实数，因此除了反射之外还必须考虑折射的情况
:::