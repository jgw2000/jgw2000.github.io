---
# 这是文章的标题
title: 概率分析和随机化算法
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 4
# 设置作者
author: 被子
# 设置写作时间
date: 2024-08-27
# 一个页面可以有多个分类
category:
  - 算法
# 一个页面可以有多个标签
tag:
  - 概率
  - 随机化算法
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 雇佣问题
```C++
hire_assistant(n)
  best = 0        // candidate 0 is a least-qualified dummy candidate
  for i = 1 to n
    interview candidate i
    if candidate i is better than candidate best
      best = i
      hire candidate i
```
最坏情况下时间复杂度为 $\mathcal{O}(c_in+c_hn)$
假定知道输入的分布情况下，通过概率分析可以计算出平均情况时间复杂度。
::: tip
对于雇佣问题，每一个申请人(编号 1 - n)都有一个排名 rank(1) - rank(n)，<rank(1), ... , rank(n)> 是列表 <1, 2, ... , n> 的一个排列；我们可以假定申请人以完全随机的顺序进来，则表示所有 n! 个排列出现的概率都相等。
:::

## 指示器随机变量
> 给定样本空间 S 和事件 A，指示器随机变量 I{A} 定义为
$$
I\{A\}=
\begin{cases}
1& \text{A occurs} \\
0& \text{A does not occur}
\end{cases}
$$

::: info 引理
给定样本空间 S 和事件 A，令 X<sub>A</sub> = I{A}，则有 E[X<sub>A</sub>] = Pr{A}
:::

### 示例（雇佣问题）
令随机变量 X 表示雇佣次数，X<sub>i</sub> 表示第 i 个申请人是否雇佣，即
$$
\begin{aligned}
X_i &= I\{\text{candidate i is hired}\}\\[3px]
&=
\begin{cases}
1& \text{if candidate i is hired} \\[3px]
0& \text{if candidate i is not hired}
\end{cases}
\end{aligned}
$$
则有
$$
\begin{aligned}
E[X] &= E\left[ \sum_{i=1}^n X_i\right] \\[3px]
&= \sum_{i=1}^n E[X_i] \\[3px]
&= \sum_{i=1}^n \frac{1}{i} \\[3px]
&= ln\,\text{n} + O(1)
\end{aligned}
$$

### 示例（逆序对的期望数）
将期望分解为每一个具体的事件：共有 C(n,2) 对数，每对数为逆序对的概率是 1/2. (单个事件的期望是 1/2).
那么总得期望就是：C(n,2) * 1/2 = n(n-1)/4

## 随机化算法
::: tip
很多情况下，我们并不知道输入的分布情况或者无法对输入的分布进行建模，这时候就可以使用随机化算法。例如，对于雇佣问题我们不按照给定的1 - n 顺序来面试，而是每次都随机选择一个申请人来面试。
:::
```C++
randomized_hire_assistant(n)
  randomly permute the list of candidates
  hire_assistant(n)
```
>**综上，随机化算法的行为不仅取决于输入，还取决于随机数生成器所产生的结果；一般使用期望运行时间来描述随机化算法运行复杂度。**

::: info 随机排列数组
```C++
randomly_permute(A,n)
  for i = 1 to n
    swap A[i] with A[RANDOM(i,n)]
```
接下来使用数学归纳法证明该算法可以产生随机的排列分布<br>

**假设：** 经过 k 次循环之后，对于 n 个元素中的任一 k 排列，A[1:k] 是该排列的概率都相等, 等于 (n - k)! / n! <br><br>
**推导：** 经过 k+1 次循环之后，记数组 A 中前 k+1 个元素为 <x<sub>1</sub>,x<sub>2</sub>,...,x<sub>k+1</sub>>，令 E<sub>1</sub> 表示经过前面 k 次循环之后数组 A 中前 k 个元素正好为 <x<sub>1</sub>,x<sub>2</sub>,...,x<sub>k</sub>>，根据假设有
$$
P\{E_1\}=\frac{(n-k)!}{n!}
$$
令 E<sub>2</sub> 表示第 k+1 次循环中选择 x<sub>k+1</sub> 放入 A[k+1] 中，则 E = E<sub>1</sub>∩E<sub>2</sub> 表示数组 A 中前 k+1 个元素正好为 <x<sub>1</sub>,x<sub>2</sub>,...,x<sub>k+1</sub>>，其概率为
$$
\begin{aligned}
P\{E\} &= P\{E_1 \cap E_2\} = P\{E_2|E_1\}P\{E_1\} \\[3px]
&= \frac{1}{n-k}\cdot \frac{(n-k)!}{n!} \\[3px]
&= \frac{(n-k-1)!}{n!}
\end{aligned}
$$
**初始：** 当 k = 1 时，令 E 表示 A[1] = x<sub>1</sub>，则 P{E} = 1/n = (n - 1)! / n! 成立<br><br>
**终止：** 经过 n 次循环之后，数组 A 的任一 n 排列的概率为 (n - n)! / n! = 1 / n!
:::

## 概率分析示例
### 生日悖论
::: info 问题
期望多少人情况下，有 2 个人生日相同？
:::
**解：** 令 X<sub>ij</sub> 表示 (i,j) 两人生日相同，有 E[X<sub>ij</sub>] = 1/n
$$
\begin{aligned}
X_{ij} &= I\{\text{person i and j have the same birthday}\}\\[3px]
&=
\begin{cases}
1& \text{if person i and j have the same birthday} \\[3px]
0& \text{otherwise}
\end{cases}
\end{aligned}
$$
令 X 表示有多少对生日相同，则
$$
\begin{aligned}
E[X] &= E\left[\sum_{i=1}^{k-1}\sum_{j=i+1}^k X_{ij} \right] \\[3px]
&= \sum_{i=1}^{k-1}\sum_{j=i+1}^k E[X_{ij}] \\[3px]
&=  \left(\begin{array}{c}k\\ 2\end{array}\right) \frac{1}{n} \\[3px]
&= \frac{k(k-1)}{2n} 
\end{aligned}
$$
假设 n = 365 天，当 k(k-1) >= 2n 时，即 k = 28 人时，至少有一对生日相同

### 球与桶
> 有 b 个相同的桶 <1, 2, ..., b>，随机将 n 个球投入桶中，投进每个桶中的概率都相等为 1/b，这一问题模型对于分析哈希算法特别有用
::: info 问题 1
每一个桶中期望会有多少个球 ?s
:::
**解：** 令 X<sub>i</sub> 表示第 i 个球进入指定的桶中，有 E[X<sub>i</sub>] = 1 / b
$$
\begin{aligned}
X_{i} &= I\{\text{第 i 球进入指定的桶中}\}\\[3px]
&=
\begin{cases}
1& \text{第 i 球进入指定的桶中} \\[3px]
0& \text{otherwise}
\end{cases}
\end{aligned}
$$
令 X 表示有多少球进入指定的桶中，则
$$
\begin{aligned}
E[X] &= E\left[ \sum_{i=1}^n X_i \right] \\[3px]
&= \sum_{i=1}^n E[X_i] \\[3px]
&= n /b
\end{aligned}
$$

::: info 问题 2
平均期望需要投多少个球，才能使得指定的桶中至少有1个球？
:::
**解：** 令 X 表示需要投多少球才能成功投进指定的桶，每次成功投进的概率为 p = 1 / b，失败概率为 q = (b -1）/ b，则 P{X=k} = q<sup>k-1</sup>p 符合几何分布，因此 E[X] = 1 / p = b

::: info 问题 3
平均期望需要投多少个球，才能使得每个桶中都至少有1个球？
:::
**解：** 可以将整个投球过程分为 b 个阶段，每一个阶段都会持续到投入一个空的桶中为止。令 X<sub>i</sub> 表示第 i 个阶段中需要投多少球才能投进空的桶中，则 X<sub>i</sub> 也符合几何分布且概率 
p = (b - i + 1) / b，又令 X = X<sub>1</sub> + ... + X<sub>b</sub> 表示需要投多少球才能使得每个桶中都至少有 1 个球，则
$$
\begin{aligned}
E[X] &= E\left[\sum_{i=1}^b X_i\right] = \sum_{i=1}^b E[X_i] \\[3px]
&=\sum_{i=1}^b \frac{b}{b-i+1} \\[3px]
&= b\sum_{i=1}^b \frac{1}{i} \\[3px]
&= b(lnb+\mathcal{O}(1))
\end{aligned}
$$