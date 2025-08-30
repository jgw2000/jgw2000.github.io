---
# 这是文章的标题
title: PBR
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 4
# 设置作者
author: 被子
# 设置写作时间
date: 2025-5-11
# 一个页面可以有多个分类
category:
  - 实时渲染
# 一个页面可以有多个标签
tag:
  - PBR
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 微平面理论
::: info
微平面理论将粗糙的平面建模成为一组微平面的集合，每一个单独的微平面都非常小，无法被相机分辨，然而这些微平面的集合对于散射光的角度分布却有着巨大的影响。
:::
![](/rtr/images/pbr_1.png)

微平面模型主要由两部分组成：
1. 微平面的法线统计分布
2. 微平面的 BSDF

除此之外，以下三个因素也会对光的散射产生影响：遮挡、阴影和微平面间的反射

![](/rtr/images/pbr_2.png)

### 微平面的法线统计分布

![](/rtr/images/pbr_3.png)

微平面的法线统计分布 NDF D(m) 表示在 1 个单位宏观面积下，方向角等于 $\omega_m$ 的所有微平面的总面积，对方向角取微分可得:

$$
dA_m = D(m)\, d\omega_m\,A
$$

将 A 移到等式左边，两边同时积分可得:

$$
\frac{1}{A} \int (n\cdot m)\,dA_m = \int_\Omega D(m)\,(n\cdot m)\,d\omega_m
$$

当上述等式为 1 时， 即 $\int (n\cdot m)\,dA_m = A$，表示所有微平面的投影面积之和等于宏观平面面积，则得出 NDF 需要满足的一个性质：

::: tip NDF 性质 1
$$
\int_{m\in \Theta} D(m)(n\cdot m) dm = 1
$$
:::

更一般地，投影到任意方向 v 满足如下性质
::: tip NDF 性质 2
$$
\int_{m\in \Theta} D(m)(v\cdot m) dm = v\cdot n
$$
:::

另外我们可以看到，存在许多重叠的微平面会投影到同一个区域，正负相互抵消之后我们只关心可见的那一个微平面（即最接近投影平面的那一个）。我们定义遮挡函数 G₁(m,v) 表示在所有法线等于 m 的微平面中，在 v 方向上可见的微平面所占的比例，则有
::: tip NDF 性质 3
$$
\int_{m\in \Theta} G_1(m,v)D(m)(v\cdot m)^+ dm = v\cdot n
$$
:::

<div align=center>
<img src=/rtr/images/pbr_4.png style="zoom:50%"/>
</div>

### 遮挡函数
Heitz 证明了只有 Smith 遮挡函数和 Torrance-Sparrow "V-cavity" 函数满足以上性质且在数学上是有效的；进一步的，Heitz 还证明了只有 Smith 遮挡函数同时满足 normal-masking 独立性，即 G₁(m,v) 不依赖于法线方向 m 只要 m·v ≥ 0

::: tip Smith G₁ 函数
$$
G_1(m,v) = \frac{\chi^+(m\cdot v)}{1+\Lambda(v)}
$$
其中
$$
\chi^+(x) =
\begin{cases}
1,& \text{where } x > 0 \\
0,& \text{where } x \le 0
\end{cases}
$$
$\Lambda$ 函数对于每一个 NDF 都不同
:::

::: warning
Smith 遮挡函数适用于随机表面，对于法线和遮挡有强依赖的表面（尤其是具有重复结构的表面，例如大多数织物），其准确性则会降低。
:::

类似地，我们可以定义联合遮挡-阴影函数 G₂(l,v,m) 表示在所有法线等于 m 的微平面中，在 l 和 v 方向上都可见的微平面所占的比例
<br><br>
G₂ 函数有多种形式
1. 分离式
::: tip
$$
G_2(l,v,m) = G_1(v,m)G_1(l,m)
$$
:::
该形式表示遮挡和阴影是不相关的事件，这是不符合现实的，因此会导致表面显示过暗

2. 方向相关

当 v 和 l 之间的水平夹角等于 0 时，G₂(l,v,m) 应该等于 min(G₁(m,v),G₁(m,l))，则
::: tip
$$
G_2(l,v,m) = \lambda(\phi)G_1(v,m)G_1(l,m) + (1 - \lambda(\phi))min(G_1(v,m),G_1(l,m))
$$
:::
该等式表示了在分离式和高度相关之间的线性插值

3. 高度相关

高度越低的点被遮挡和阴影的概率越大，如果使用 Smith 遮挡函数，则可以用 Smith 高度相关遮挡-阴影函数来表示该关联
::: tip
$$
G_2(l,v,m) = \frac{\chi^+(m\cdot v)\chi^+(m\cdot l)}{1+\Lambda(v)+\Lambda(l)}
$$
:::

4. 方向和高度相关
::: tip
$$
G_2(l,v,m) = \frac{\chi^+(m\cdot v)\chi^+(m\cdot l)}{1+max(\Lambda(v),\Lambda(l))+\lambda(v,l)min(\Lambda(v),\Lambda(l))}
$$
:::

## 基于微平面的 BRDF 模型
### **推导**
1. 根据 BRDF 定义
$$
\begin{aligned}
f(l, v) &= \frac{dL(M)}{L_i\,|n\cdot l|\,d\omega_i}
\end{aligned}
$$

2. 将宏观平面 $L(M)$ 用微平面 $L(m)$ 来表示 (每个微平面投影的 Irradiance 总和除以投影面积)，其中 $D_o(m)$ 表示在投影方向上的可见法线分布
$$
\begin{aligned}
L(M) &= \frac{1}{|n\cdot v|} \int_\Omega L(m)\,G_1(l,v)\,|m\cdot v|\, D(m)\,dm \\
&= \int_\Omega L(m)\,D_o(m)\,dm
\end{aligned}
$$

3. 对上式进行微分
$$
dL(M) = \int_\Omega dL(m)\,D_o(m)\,dm
$$

4. 同样根据 BRDF 定义，微平面 $L(m)$ 可以表示为
$$
dL(m) = f_\mu(l,v,m)\,|m\cdot l|\,L_i\,d\omega_i
$$

5. 结合 3，4 可得
$$
\begin{aligned}
dL(M) &= \int_\Omega f_\mu(l,v,m)\,cos\theta_i\,L_i\,d\omega_i\,D_o(m)\,dm \\
&= L_i\,d\omega_i\int_\Omega f_\mu(l,v,m)\,|m\cdot l|\,D_o(m)\,dm
\end{aligned}
$$

6. 结合 1，5 可得
$$
\begin{aligned}
f(l,v) &= \frac{L_i\,d\omega_i\int_\Omega f_\mu(l,v,m)\,|m\cdot l|\,D_o(m)\,dm}{L_i\,|n\cdot l|\,d\omega_i} \\
&= \frac{1}{|n\cdot l|}\int_\Omega f_\mu(l,v,m)\,|m\cdot l|\,D_o(m)\,dm \\
&= \frac{1}{|n\cdot l|}\frac{1}{|n\cdot v|} \int_\Omega f_\mu(l,v,m)\,|m\cdot l|\,G_1(l,v)\,|m\cdot v|\,D(m)\,dm
\end{aligned}
$$

我们使用 $G_2$ 代替 $G_1$
::: tip
$$
f(l,v) = \frac{1}{|n\cdot l|}\frac{1}{|n\cdot v|} \int_\Omega f_\mu(l,v,m)\,G_2(l,v,m)\,D(m)\,|m\cdot l|\,|m\cdot v|\,dm
$$
:::

其中 n 是宏观平面的法线，m 是微平面的法线

### 基于 specular 微平面的 BRDF
specular BSDF 反射一部分入射光的能量到方向 $s$ 上，反射比例 $\rho$ (即菲涅尔反射 F) 和反射方向 $s$ 是入射方向 $i$ 和局部表面法线 $m$ 的函数，可以写成
$$
\begin{aligned}
f_s(i,o,m) &= \frac{dL(m)\,\delta_{\omega_o}(s,o)}{L_i\,d\omega_i\,|i\cdot m|} = \frac{dL(m)}{L_i\,d\omega_i}\frac{\delta_{\omega_o}(s,o)}{|i\cdot m|} \\
&= \rho\,\frac{\delta_{\omega_o}(s,o)}{|o\cdot m|}
\end{aligned}
$$
其中
$$
\delta_{\omega_o}(s,o) = \left\{
  \begin{array}{cl}
  \infty, &\quad s = o \notag \\
  0, &\quad \text{otherwise} \notag
  \end{array}
\right.
$$
表示 Dirac delta 函数，且满足如下等式
$$
\int_\Omega g(o)\,\delta_{\omega_o}(s,o)\,d\omega_o = \left\{
  \begin{array}{cl}
  g(s) &\quad s = o \notag \\
  0 &\quad \text{otherwise} \notag
  \end{array}
\right.
$$

又 $f_s(i,o,m)$ 是以出射方向 $s$ 为积分变量， 为了代入上一节的方程，我们需要使用微平面的法线和其对应的立体角作为积分变量
$$
\begin{aligned}
f_s(i,o,m) &= \rho\,\frac{\delta_{\omega_m}(h(i, o),m)}{|o\cdot m|}\,\Big\|\frac{\partial \omega_h}{\partial \omega_o}\Big\| \\
&= \rho\,\frac{\delta_{\omega_m}(h(i, o),m)}{|o\cdot m|}\,\frac{1}{4|o\cdot h|} \\
&= F(h,i)\,\frac{\delta_{\omega_m}(h(i, o),m)}{|o\cdot m|}\,\frac{1}{4|o\cdot h|} \\
\end{aligned}
$$

::: info
![](/rtr/images/pbr_5.png)

$$
\begin{aligned}
\Big\|\frac{\partial \omega_h}{\partial \omega_o}\Big\| &= \frac{|o\cdot h_r|}{\|\vec{h_r}^2\|} = \frac{|o\cdot h_r|}{(\vec{h_r}\cdot h_r)^2} \\
&= \frac{|o\cdot h_r|}{((i+o)\cdot h_r)^2} = \frac{|o\cdot h_r|}{(2\,o\cdot h_r)^2} \\
&= \frac{1}{4|o\cdot h|}
\end{aligned}
$$
:::

代入可得
::: tip
$$
\begin{aligned}
f(l,v) &= \frac{1}{|n\cdot l|}\frac{1}{|n\cdot v|} \int_\Omega F(m,l)\,\frac{\delta_{\omega_m}(h(l, v),m)}{|m\cdot v|}\,\frac{1}{4|m\cdot l|}\,G_2(l,v,m)\,D(m)\,|m\cdot l|\,|m\cdot v|\,dm \\[3px]
&= \frac{F(h,l)\,G_2(l,v,h)\,D(h)}{4|n\cdot l||n\cdot v|}
\end{aligned}
$$
:::

### 基于 diffuse 微平面的 BRDF
$$
f_d(i,o,m) = \frac{1}{\pi}
$$

代入可得
::: tip
$$
f(l,v) = \frac{1}{\pi}\frac{1}{|n\cdot l|}\frac{1}{|n\cdot v|} \int_\Omega G_2(l,v,m)\,D(m)\,|m\cdot l|\,|m\cdot v|\,dm
$$
:::

## 基于物理的遮挡函数

### Smith 微平面 Profile

::: info 法线/遮挡独立性
Smith 假定微平面上不同点之间的法线或者高度是不相关的（即使是相邻点之间），是一组随机的不连续的微平面的集合。

![](/rtr/images/pbr_6.png)

$G_1(\omega_o,\omega_m)$ 可以理解为被遮挡的概率，其独立于该点处的法线方向 $\omega_m$，因此可以表示为

$$
G_1(\omega_o,\omega_m) = G_1^{local}(\omega_o,\omega_m)\,G_1^{dist}(\omega_o)
$$

其中
$$
G_1^{local} = \chi^+(\omega_o\cdot \omega_m)
$$
:::

::: tip 遮挡函数公式推导
$$
\begin{aligned}
cos\theta_o &= \int_\Omega G_1(\omega_o,\omega_m)\,(\omega_o,\omega_m)^+\,D(\omega_m)\,d\omega_m \\
&= \int_\Omega G_1^{local}(\omega_o,\omega_m)\,G_1^{dist}(\omega_o)\,(\omega_o,\omega_m)^+\,D(\omega_m)\,d\omega_m \\
&= \int_\Omega \chi^+(\omega_o\cdot\omega_m)\,G_1^{dist}(\omega_o)\,(\omega_o,\omega_m)^+\,D(\omega_m)\,d\omega_m \\
&= G_1^{dist}(\omega_o)\,\int_\Omega (\omega_o,\omega_m)^+\,D(\omega_m)\,d\omega_m \\
\end{aligned}
$$

可得
$$
G_1(\omega_o,\omega_m) = \chi^+(\omega_o\cdot\omega_m) \frac{cos\theta_o}{\int_\Omega (\omega_o,\omega_m)^+\,D(\omega_m)\,d\omega_m}
$$
:::

### Smith 遮挡函数
通过将积分域从法线变换到斜率空间，可以证明 Smith 遮挡函数可以表示成
$$
G_1^{dist}(\omega_o,\omega_m) = \frac{1}{1 + \Lambda(\omega_o)}
$$
即
$$
G_1(\omega_o,\omega_m) = \frac{\chi^+(\omega_o\cdot\omega_m)}{1+\Lambda(\omega_o)}
$$

### 遮挡函数的拉伸不变性

![](/rtr/images/pbr_7.png)

#### **斜率分布**[^1]
如果微平面是一个高度场，其高度分布表示为 $P^1(h)$，那么这个微平面的斜率就是高度的梯度，$(x_{\tilde{m}},y_{\tilde{m}}) = \nabla h$， 斜率的分布可以表示为 $P^{22}(x_{\tilde{m}},y_{\tilde{m}})$
$$
\tilde{m} = (x_{\tilde{m}},y_{\tilde{m}}) = \left(-\frac{x_m}{z_m},-\frac{y_m}{z_m}\right) = -tan\theta_m(cos\phi_m,sin\phi_m)
$$
其中法线 $\omega_m=(x_m,y_m,z_m)$ 也可以用斜率表示为
$$
\omega_m = \frac{(-x_{\tilde{m}},-y_{\tilde{m}},1)}{\sqrt{x^2_{\tilde{m}}+y^2_{\tilde{m}}+1}}
$$
斜率分布必须满足归一化
$$
\int_{-\infty}^\infty\int_{-\infty}^\infty P^{22} (x_{\tilde{m}},y_{\tilde{m}})\,dx_{\tilde{m}}dy_{\tilde{m}} = 1
$$

又斜率分布和法线分布之间满足如下等式
$$
P^{22}(\tilde{m})\,d\tilde{m} = (\omega_m\cdot\omega_g)\,D(\omega_m)\,d\omega_m
$$

则法线分布可以表示为
$$
D(\omega_m,\alpha) = \frac{P^{22}(x_{\tilde{m}},y_{\tilde{m}},\alpha)}{cos^4\theta_m}
$$
其中 $\frac{1}{cos^4\theta_m}$ 表示 Jacobian 项，$\alpha$ 表示粗糙度参数

::: info 各向同性且形状不变的斜率分布
当斜率的分布只依赖于斜率幅度 $tan\theta_m = \sqrt{x^2_{\tilde{m}} + y^2_{\tilde{m}}}$ 和粗糙度参数 $\alpha$ 的比值时，即
$$
P^{22}(x_{\tilde{m}},y_{\tilde{m}},\alpha) = \frac{1}{\alpha^2}f\left(\sqrt{(\frac{x_{\tilde{m}}}{\alpha})^2+(\frac{y_{\tilde{m}}}{\alpha})^2}\right) = \frac{1}{\alpha^2}f\left(\frac{\sqrt{x_{\tilde{m}}^2+y_{\tilde{m}}^2}}{\alpha}\right) = \frac{1}{\alpha^2}f\left(\frac{tan\theta_m}{\alpha}\right)
$$
:::

其中 $f$ 是一维函数定义了分布的形状，$\alpha$ 是粗糙度参数

1. **Beckmann Distribution**
   $$
   \begin{aligned}
   P^{22}(x_{\tilde{m}},y_{\tilde{m}}) &= \frac{1}{\pi\alpha^2}exp\left(-\frac{x_{\tilde{m}}^2+y_{\tilde{m}}^2}{\alpha^2}\right) \\
   D(\omega_m) &= \frac{\chi^+(\omega_m\cdot\omega_g)}{\pi\alpha^2cos^4\theta_m}exp\left(-\frac{tan^2\theta_m}{\alpha^2}\right) \\
   \Lambda(a) &= \frac{erf(a) - 1}{2} + \frac{1}{2a\sqrt{\pi}}exp(-a^2)
   \end{aligned}
   $$

   其中 $a = \frac{1}{\alpha\,tan\theta_o}$，$\alpha$ 控制平面的粗糙度，其正比于微平面斜率的均方根，等于0时表示完全光滑

$$
\Lambda(a) \approx \left\{
  \begin{align}
  \quad&\frac{1-1.249a+0.396a^2}{3.535a+2.181a^2} &\quad \text{if } a < 1.6 \notag \\
  \quad&0 &\quad \text{otherwise} \notag
  \end{align}
\right.
$$

2. **GGX Distribution**
   $$
   \begin{aligned}
   P^{22}(x_{\tilde{m}},y_{\tilde{m}}) &= \frac{1}{\pi\alpha^2\left(1 + \frac{x_{\tilde{m}}^2+y_{\tilde{m}}^2}{\alpha^2}\right)^2} \\
   D(\omega_m) &= \frac{\chi^+(\omega_m\cdot\omega_g)}{\pi\alpha^2cos^4\theta_m\left(1+\frac{tan^2\theta_m}{\alpha^2}\right)^2} \\
   \Lambda(a) &= \frac{-1+\sqrt{1 + \frac{1}{a^2}}}{2}
   \end{aligned}
   $$

   其中 $a = \frac{1}{\alpha\,tan\theta_o}$，在迪士尼着色模型中使用 $a = r^2$ 来控制粗糙度，其中 $r \in [0,1]$

   [^1]: [Slope Space in BRDF Theory](https://www.reedbeta.com/blog/slope-space-in-brdf-theory/)