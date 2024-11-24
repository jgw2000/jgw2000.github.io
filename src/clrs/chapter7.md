---
# 这是文章的标题
title: 快速排序
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 6
# 设置作者
author: 被子
# 设置写作时间
date: 2024-11-24
# 一个页面可以有多个分类
category:
  - 算法
# 一个页面可以有多个标签
tag:
  - 快速排序
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 快速排序
```C++
quicksort(A,p,r)
  if p < r
    // Partition the subarray around the pivot, which ends up in A[q].
    q = partition(A,p,r)
    quick_sort(A,p,q-1)
    quick_sort(A,q+1,r)
```

![](/clrs/images/chapter7_1.png)

```C++
partition(A,p,r)
  x = A[r]
  i = p - 1 // highest index into the low side
  for j = p to r - 1
    if A[j] ≤ x
      i = i + 1
      exchange A[i] with A[j]
  exchange A[i+1] with A[r]
  return i + 1
```

### 最坏情况下的划分
$$
\begin{aligned}
T(n) &= T(n-1) + T(0) + \Theta(n) \\
&= T(n-1) + \Theta(n) \\
\end{aligned}
$$

可得
$$
T(n) = \Theta(n^2)
$$

### 最好情况下的划分
$$
T(n) = 2T(n/2) + \Theta(n)
$$

可得
$$
T(n) = \Theta(nlgn)
$$

:::info
假设每次划分都会分为 9 : 1, 则有
$$
T(n) = T(9n/10) + T(n/10) + \Theta(n) = \Theta(nlgn)
$$
:::

## 随机快速排序
```C++
randomized_quicksort(A,p,r)
  if p < r
    q = randomized_partition(A,p,r)
    randomized_quicksort(A,p,q-1)
    randomized_quicksort(A,q+1,r)
```

```C++
randomized_partition(A,p,r)
  i = random(p,r)
  exchange A[r] with A[i]
  return partition(A,p,r)
```

### 最坏情况分析
$$
T(n) = max\{ T(q) + T(n - 1 - q) : 0 \le q \le n - 1 \} + \Theta(n)
$$

使用替换法分析，假设 T(n) ≤ cn²，则有
$$
\begin{aligned}
T(n) &\le max\{ cq^2 + c(n-1-q)^2 : 0 \le q \le n - 1 \} + \Theta(n) \\
&= c \cdot max\{ q^2 + (n-1-q)^2 : 0 \le q \le n - 1 \} + \Theta(n)
\end{aligned}
$$

又
$$
\begin{aligned}
q^2 + (n-1-q)^2 &= q^2 + (n-1)^2 - 2q(n-1) + q^2 \\
&= (n-1)^2 + 2q(q-(n-1)) \\
&\le (n-1)^2
\end{aligned}
$$

可得
$$
\begin{aligned}
T(n) &\le c(n-1)^2 + \Theta(n) \\
&\le cn^2 - c(2n - 1) + \Theta(n) \\
&\le cn^2
\end{aligned}
$$

因此
$$
T(n) = \Theta(n^2)
$$

### 期望运行时间
::: tip 引理1
快速排序的运行时间是 $\mathcal{O}(n+X)$，其中 $X$ 等于元素比较的次数
:::

::: tip 引理2
对于 n 个元素的数组 $z_1 < z_2 < ... < z_n$，在随机快速排序的执行过程中，元素 $z_i$ 和元素 $z_j$ 之间会进行比较，当且仅当在 $Z_{ij}$ 中任意元素之前元素 $z_i$ 或元素 $z_j$ 被选为 pivot。 另外，没有两个元素之间会比较两次。
:::

::: tip 引理3
对于 n 个元素的数组 $z_1 < z_2 < ... < z_n$，在随机快速排序的执行过程中，元素 $z_i$ 和元素 $z_j$ 之间会进行比较的概率是 $2/(j-i+1)$

证明
$$
\begin{aligned}
Pr\{z_i \text{ is compared with } z_j \} &= Pr\{z_i \text{ or } z_j \text{ is the first pivot chosen from } Z_{ij} \} \\
&= Pr\{z_i \text{ is the first pivot chosen from } Z_{ij}\} + Pr\{z_j \text{ is the first pivot chosen from } Z_{ij}\} \\
&= \frac{2}{j-i+1}
\end{aligned}
$$
:::

::: tip 定理
对于 n 个不同的元素的数组，随机快速排序的期望运行时间是 $\mathcal{O}(nlgn)$

证明
$$
X = \sum_{i=1}^{n-1}\sum_{j=i+1}^n X_{ij}
$$

其中 $X_{ij} = I\{z_i \text{ is compared with } z_j\}$, 根据期望的性质有
$$
\begin{aligned}
E[X] &= E\left[ \sum_{i=1}^{n-1}\sum_{j=i+1}^n X_{ij} \right] \\
&= \sum_{i=1}^{n-1}\sum_{j=i+1}^n E[X_{ij}] \\
&= \sum_{i=1}^{n-1}\sum_{j=i+1}^n Pr\{ z_i \text{ is compared with } z_j \} \\
&= \sum_{i=1}^{n-1}\sum_{j=i+1}^n \frac{2}{j-i+1} \\
&= \sum_{i=1}^{n-1}\sum_{k=1}^{n-i} \frac{2}{k+1} \\
&< \sum_{i=1}^{n-1}\sum_{k=1}^{n} \frac{2}{k} \\
&= \sum_{i=1}^{n-1} \mathcal{O}(lgn) \\
&= \mathcal{O}(nlgn)
\end{aligned}
$$
:::