---
# 这是文章的标题
title: 蒙特卡洛积分
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 被子
# 设置写作时间
date: 2024-11-29
# 一个页面可以有多个分类
category:
  - 光线追踪
# 一个页面可以有多个标签
tag:
  - 蒙特卡洛积分
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 蒙特卡洛估计
给定 1D 积分 $\int_a^b f(x) dx$，我们随机采样一组独立的均匀随机变量 $X_i \in [a,b]$，蒙特卡洛估计值等于
$$
F_n = \frac{b - a}{n} \sum_{i=1}^n f(X_i)
$$
期望等于
$$
\begin{aligned}
E[F_n] &= E\left[\frac{b-a}{n}\sum_{i=1}^n f(X_i)\right] \\
&= \frac{b-a}{n}\sum_{i=1}^n E[f(X_i)] \\
&= \frac{b-a}{n}\sum_{i=1}^n \int_a^b f(x)p(x) dx \\
&= \frac{b-a}{n}\sum_{i=1}^n \int_a^b f(x) \frac{1}{b-a} dx \\
&= \frac{1}{n}\sum_{i=1}^n \int_a^b f(x) dx \\
&= \int_a^b f(x) dx
\end{aligned}
$$
一般地，如果随机变量根据 PDF $p(x)$ 采样（其中 $p(x) >= 0$），则蒙特卡洛估计值等于
$$
F_n = \frac{1}{n} \sum_{i=1}^n \frac{f(X_i)}{p(X_i)}
$$
期望等于
$$
E[F_n] = \int_a^b f(x) dx
$$

## 蒙特卡洛估计误差
:::tip 方差
$$
V[F] = E[F - E[F]]^2 = E[F^2] - E[F]^2
$$

$$
V[aF] = a^2V[F]
$$
:::
当 $F$ 为蒙特卡洛估计时，方差等于
$$
\begin{aligned}
V\left[F_n\right] &= V\left[\frac{1}{n}\sum_{i=1}^n\frac{f(X_i)}{p(X_i)}\right] \\
&= \frac{1}{n^2} \sum_{i=1}^n V\left[\frac{f(X_i)}{p(X_i)}\right] \\
&= \frac{1}{n} V\left[\frac{f(X)}{p(X)}\right]
\end{aligned}
$$

可见随着采样数量 $n$ 的增长，方差呈线性的下降，又由于方差表示误差的平方，因此蒙特卡洛估计的误差以 ==$O(n^{-1/2})$== 的速度下降。

:::tip 偏差
$$
\beta = E[F] - \int f(x) dx
$$
如果有偏估计能够比无偏估计更快的收敛到正确的结果，那么有偏估计仍然是可取的
:::

:::tip 均方差
$$
MSE[F] = E\left[\left(F - \int f(x) dx\right)^2\right]
$$

$$
MSE[F] = V[F] + \beta[F]^2
$$
当偏差 $\beta = 0$ 时，均方差等于方差
:::

:::tip 样本方差
随机采样一组独立的随机变量 $X_i$，样本均值 $\bar{X} = (1/n) \sum X_i$, 则样本方差等于
$$
S = \frac{1}{n-1} \sum_{i=1}^n (X_i - \bar{X})^2
$$
样本方差可以理解为对样本总体方差的一个无偏估计
:::

## 提升蒙特卡洛估计效率
### 分层采样 Stratified Sampling
:::tip 基本思想
将积分域 $\Lambda$ 划分成 $n$ 个不重叠的区域 $\Lambda_1,\Lambda_2,...,\Lambda_n$，且满足
$
\mathop{\cup}\limits_{i=1}^n \Lambda_i = \Lambda
$
，我们根据概率 $p_i$ 从每一个 $\Lambda_i$ 中随机抽取 $n_i$ 个样本，则在 $\Lambda_i$ 内的蒙特卡洛估计值等于
$$
F_i = \frac{1}{n_i} \sum_{j=1}^{n_i} \frac{f(X_{i,j})}{p_i(X_{i,j})}
$$
整体估计
$$
\begin{aligned}
F &= \frac{1}{m} \sum_{i=1}^m \frac{f(X_i)}{p(X_i)} = \frac{1}{m} \sum_{i=1}^n \sum_{j=1}^{n_i} \frac{f(X_{i,j})}{p_i(X_{i,j})} \\
&= \frac{n_i}{m} \sum_{i=1}^n \frac{1}{n_i} \sum_{j=1}^{n_i} \frac{f(X_{i,j})}{p_i(X_{i,j})} \\
&= \frac{n_i}{m} \sum_{i=1}^n F_i \\
&= \sum_{i=1}^n v_i F_i
\end{aligned}

其中 \, v_i \, 表示第 \, i \, 个区域所占的比例
$$
:::

- [ ] TODO

### 重要性采样 Importance Sampling
::: tip 基本思想
当使用和被积函数 $f(x)$ 相似的分布进行采样时，即 $p(x) \propto f(x)$ 或 $p(x) = cf(x)$，蒙特卡洛估计会收敛的更快。
:::

假设令 $p(x) = cf(x)$，根据 $\int p(x) = 1$，可得
$$
c = \frac{1}{\int f(x) dx}
$$
此时蒙特卡洛估计的方差等于
$$
\begin{aligned}
V[F] &= \frac{1}{n} V\left[\frac{f(X)}{p(X)}\right] \\[10px]
&= \frac{1}{n} V[\frac{1}{c}] \\[10px]
&= 0
\end{aligned}
$$

然后实际上我们并不知道 $f(x)$ 的分布，但是可以使用和 $f(x)$ 相似的分布，从而降低方差 ！

### 多重重要性采样 Multiple Importance Sampling（MIS）
- [ ] TODO

### 俄罗斯轮盘 Russian Roulette
:::tip
俄罗斯轮盘是一种可以提高蒙特卡洛估计效率的技术，它通过跳过对最终结果贡献很小的样本来减少计算量从而提高效率。在渲染中我们经常使用以下形式的估计量
$$
\frac{f(X)v(X)}{p(X)}
$$
其中 $f(X)$ 很容易计算（例如 BRDF 函数）而 $v(X)$ 计算很复杂（例如二元可见性函数），当 $f(X)$ 等于零或者很小时我们可以跳过整个的计算，但是会引入偏差，俄罗斯轮盘正式用于解决该问题的。
:::

为了应用俄罗斯轮盘，我们可以按任意方式选择一个终止概率 $q$，然后在概率 q 的情况下跳过整个计算使用常数 $c$（通常使用 c = 0），在概率 1 - q 的情况下仍然进行计算并乘上权重 $1/(1-q)$，具体如下
$$
F' = \left\{
\begin{aligned}
&\frac{F - qc}{1-q} \quad \xi > q \\
&c \quad \quad \quad \quad \text{otherwise}
\end{aligned}
\right.
$$

期望
$$
E[F'] = (1-q)\left(\frac{E[F] - qc}{1 - q}\right) + qc = E[F]
$$

使用俄罗斯轮盘总是会==增加方差==

### 划分 Splitting
- [ ] TODO

## 使用反转方法采样
:::tip
为了评估蒙特卡洛估计量， 必须能够从选定的概率分布中抽取随机样本。有多种技术可以实现，对于渲染来说，最重要的技术之一是反转方法，其通过反转分布的 CDF 将均匀样本映射到给定的概率分布。
:::

### 离散情况
![](/pbrt/images/chapter1_1.png)

CDF 定义为
$$
P_i = \sum_{j=1}^i p_j
$$

采样操作可以表示为找到 i 使得
$$
P_{i-1} \le \xi \le P_i
$$
其中 $\xi$ 是从均匀随机分布 $[0, 1]$ 中采样获得

### 连续情况
我们可以按照以下步骤从 PDF 中抽取样本
1. 对 PDF 积分得到 CDF $P(x) = \int_0^x p(x')dx'$
2. 获取均匀分布的随机数 $\xi$
3. 通过求解 $\xi = P(X)$ 来产生样本；换句话说，找到 $X = p^{-1}(\xi)$

## 分布间转换
:::tip
这里将研究一个更普遍的问题，当我们对来自任意分布的样本使用函数 $f$ 变换时会产生何种分布。假设给定一随机变量 $X$，PDF $p(x)$ 且 CDF $P(x)$，给定函数 $y = f(x)$，如果我们计算 $Y = f(X)$，我们想要找到新随机变量 $Y$ 的分布。在这种情况下，函数 $f(x)$ 必须是一一对应的，否则就无法明确地描述特定 $y$ 的概率密度。
:::

函数 $f$ 一一对应的一个直接结果是，其导数必须严格大于 0 或者严格小于 0，这意味着对一给定的 $x$ 有
$$
Pr\{Y\le f(x)\} = Pr\{X \le x\}.
$$
根据 CDF 的定义有
$$
P_f(y) = P_f(f(x)) = P(x). 
$$

CDF 之间的这种关系可以推导出 PDF 之间的关系，我们假设函数 $f$ 的导数大于 0，则微分可得
$$
p_f(y)\frac{df}{dx} = p(x)
$$
即
$$
p_f(y) = \left|\frac{df}{dx}\right|^{-1} p(x).
$$

### 多维空间中的变换
假设给定一个 d 维随机变量 $X$，其概率密度函数为 $p(x)$，令 $Y = T(X)$，则有
$$
p_T(y) = p_T(T(x)) = \frac{p(x)}{|J_T(x)|}
$$
其中 $|J_T|$ 是雅可比矩阵 $T$ 行列式的绝对值，即
$$
\begin{pmatrix}
\partial T_1 / \partial x_1 & ... & \partial T_1 / \partial x_d \\
\vdots & \ddots & \vdots \\
\partial T_d / \partial x_1 & ... & \partial T_d / \partial x_d
\end{pmatrix}
$$

:::info 例子
在 3D 中，笛卡尔坐标和球面坐标之间的关系为
$$
\begin{aligned}
x &= r sin\theta cos\phi \\
y &= r sin\theta sin\phi \\
z &= r cos\theta
\end{aligned}
$$

雅可比变换的行列式等于 $|J_T| = r^2 sin\theta$，因此对应的概率密度函数为
$$
p(r,\theta,\phi) = r^2 sin\theta \; p(x,y,z)
$$
:::

### 多维变换采样
假定我们有一个二维联合概率密度函数 $p(x,y)$，希望从中抽取样本 $(X,Y)$，如果 $x$ 和 $y$ 的概率密度是独立的，则可以表示为
$$
p(x,y) = p_x(x) p_y(y)
$$
随机变量 $(X,Y)$ 可以通过独立的采样 $X$ 和 $Y$ 来得到，然而许多有用的密度函数是不独立的，因此，这里介绍一般情况下如何从多维分布中进行采样

:::info
给定一个二维密度函数，其边际密度函数等于
$$
p(x) = \int p(x, y) dy
$$

我们从 $X \sim p(x)$ 中抽取一个样本 $X$，然后我们从条件概率密度函数中抽取一个样本 $Y$
$$
p(y|x) = \frac{p(x,y)}{\int p(x,y) dy}
$$
:::