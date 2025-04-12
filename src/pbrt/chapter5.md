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
p(\theta,\phi) = \frac{1}{\pi} cos\theta\,sin\theta
$$

我们可以是使用 Malley 方法来采样该分布

![](/pbrt/images/chapter5_4.png)
:::info Malley 方法
从单位圆中均匀采样点，然后将该点向上投影到半球面上，如此获得的采样点即满足余弦加权分布
:::