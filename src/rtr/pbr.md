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

微平面的法线统计分布 NDF D(m) 定义为：

$$
dA_m = D(m)\, d\omega_m\,A
$$

表示在宏观平面面积和方向角上的联合概率密度，进一步可以得到如下等式

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
specular BSDF 反射一部分入射光的能量到方向 $s$ 上，可以写成
$$
f_s(i,o,m) = \rho\,\frac{\delta_{\omega_o}(s,o)}{|o\cdot m|}
$$
其中
$$
\delta_{\omega_o}(s,o) = \left\{
  \begin{align}
  \infty, &\quad s = o \notag \\
  0, &\quad \text{otherwise} \notag
  \end{align}
\right.
$$

又 $f_s(i,o,m)$ 是以出射方向 $s$ 为积分变量， 为了代入上一节的方程，我们需要使用微平面的法线和其对应的立体角作为积分变量
$$
\begin{aligned}
f_s(i,o,m) &= \rho\,\frac{\delta_{\omega_m}(h(i, o),m)}{|o\cdot m|}\,\Big\|\frac{\partial \omega_h}{\partial \omega_o}\Big\| \\
&= \rho\,\frac{\delta_{\omega_m}(h(i, o),m)}{|o\cdot m|}\,\frac{1}{4|o\cdot h|}
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