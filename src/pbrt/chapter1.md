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
::: tip 基本思想
对于形如 $f(X)v(X)$ 的被积函数，其中 $f(x)$ 很容易评估而 $v(X)$ 计算很复杂，当 $f(x)$ 很小时我们可以跳过整个的计算，但会引入偏差，俄罗斯轮盘正是用于解决该问题的。
:::

使用俄罗斯轮盘的蒙特卡洛估计等于
$$
F' = \left\{
\begin{aligned}
&\frac{F - qc}{1-q} \\
&c
\end{aligned}
\right.
$$

通常 $c = 0$，期望
$$
E[F'] = (1-q)\left(\frac{E[F] - qc}{1 - q}\right) + qc = E[F]
$$

使用俄罗斯轮盘总是会==增加方差==

### 划分 Splitting
- [ ] TODO