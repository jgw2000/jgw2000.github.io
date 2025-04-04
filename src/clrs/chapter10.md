---
# 这是文章的标题
title: 哈希表
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 9
# 设置作者
author: 被子
# 设置写作时间
date: 2025-04-02
# 一个页面可以有多个分类
category:
  - 算法
# 一个页面可以有多个标签
tag:
  - 哈希
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 哈希表
![](/clrs/images/chapter10_1.png)

$$
h: U \rightarrow \{0,1,...,m - 1\}
$$

### 均匀独立哈希函数
::: tip 定义
一个理想的哈希函数 h 有如下性质，对于每一个可能的输入 k，输出 h(k) 独立并随机从范围 {0,1,...,m-1} 中选择一个元素。一旦 h(k) 确定之后，之后对同一个元素 k 将产生相同的输出 h(k)
:::

### 通过链接解决冲突
![](/clrs/images/chapter10_2.png)

::: info 负载因子
给定一个哈希表 T，有 m 个插槽并储存 n 个元素，负载因子 $\alpha$ 定义为 n / m
:::

#### 最坏情况
所有 n 个 key 都哈希到同一个插槽中，从而形成一个长度为 n 的链表，这时查找元素的最坏情况下的时间复杂度为 $\Theta(n)$

#### 平均情况
假定使用均匀独立哈希函数 h，则任意两个不同的 $k_1$ 和 $k_2$ 冲突的概率最多是 $1 / m$。令 $j=0,1,...,m-1$，$T[j]$ 的长度定义为 $n_j$，则 $n = n_0 + n_1 + \cdots + n_{m-1}$，$E[n_j] = \alpha = n/m$

::: info 定理
给定一个哈希表通过链接来解决冲突，并且假定使用均匀独立哈希函数，在平均情况下查找的时间复杂度为 $\Theta(1 + \alpha)$
:::

## 哈希函数
### 静态哈希（不推荐）
:::info 定义
对于任意数据都使用一个固定的哈希函数，其随机性仅仅来源于输入的分布（通常是未知的）
:::

#### division 方法
$$
h(k) = k \text{ mod } m
$$

#### multiplication 方法
$$
h(k) = \lfloor m(kA \text{ mod } 1)\rfloor，\quad 0 < A < 1
$$

其中 $kA \text{ mod } 1$ 表示 $kA$ 的小数部分，即 $kA - \lfloor kA \rfloor$

#### multiply-shift 方法
![](/clrs/images/chapter10_3.png)
$$
h_a(k) = (ka \text{ mod } 2^w) >>> (w - l)
$$
其中 $m = 2^l$ 且 $l \le w$


### 随机哈希（推荐）
:::info 定义
设计一个合适的哈希函数集合，并在运行时随机从该集合中选择一个哈希函数，其随机性与输入无关；该方法的一个特例是统一哈希。
:::

:::info universal 哈希
令 $\mathcal{H}$ 表示一个有限的哈希函数集合，如果对于每一对不同的 $k_1$，$k_2$，满足 $h(k_1) = h(k_2)$ 的哈希函数的数量最多是 $|\mathcal{H}| / m$，那么该哈希函数集合是 universal 的。换句话说，从 $\mathcal{H}$ 中随机选择一个哈希函数，$k_1$ 和 $k_2$ 发生冲突的概率不超过 $1 / m$。
:::

#### 性质
- $\mathcal{H}$ 是 uniform 的如果对于任意 $k$ 和插槽 $q$，$h(k) = q$ 的概率是 $1/m$
- $\mathcal{H}$ 是 universal 的如果对于任意 $k_1$ 和 $k_2$，$h(k_1) = h(k_2)$ 的概率最多是 $1/m$
- $\mathcal{H}$ 是 $\epsilon$-universal 的如果对于任意 $k_1$ 和 $k_2$，$h(k_1) = h(k_2)$ 的概率最多是 $\epsilon$

#### 基于数论的 universal 哈希函数集合
选择一个足够大的质数 p 使得 $0 \le k \le p - 1$，令 $\mathcal{Z}_p$ 表示集合 $\{0,1,...,p-1\}$，$\mathcal{Z}_p^*$ 表示集合 $\{1,2,...,p-1\}$，给定 $a \in \mathcal{Z}_p^*$，$b \in \mathcal{Z}_p$，定义哈希函数
$$
h_{ab}(k) = ((ak + b) \text{ mod } p) \text{ mod } m
$$

给定 p 和 m，所有这样的哈希函数集合是
$$
\mathcal{H}_{pm} = \{h_{ab} : a \in \mathcal{Z}_p^* \text{ and } b \in \mathcal{Z}_p\}
$$

:::info 定理
上述哈希函数集合 $\mathcal{H}_{pm}$ 是 universal 的
:::

#### 基于加密的哈希
$$
h(k) = SHA-256(k) \text{ mod } m
$$

$$
h_a(k) = SHA-256(a \text{ || } k) \text{ mod } m
$$

## 开放寻址
$$
h: U \times \{0,1,...,m-1\} \rightarrow \{0,1,...,m-1\}
$$

```C++
HASH-INSERT(T,k)
  i = 0
  repeat
    q = h(k,i)
    if T[q] == NIL
      T[q] = k
      return q
    else i = i + 1
  until i == m
  error "hash table overflow"

HASH-SEARCH(T,k)
  i = 0
  repeat
    q = h(k,i)
    if T[q] == k
      return q
    i = i + 1
  until T[q] == NIL or i == m
  return NIL
```

### 双重哈希
$$
h(k,i) = (h_1(k) + i h_2(k)) \text{ mod } m
$$

### 线性探查
$$
h(k,i) = (h_1(k) + i) \text{ mod } m
$$

:::info
给定一个开放寻址的哈希表，负载因子 $\alpha = n/m < 1$，假定均匀独立哈希且没有删除，那么一次不成功的查找所需要的期望探查次数最多是 $1/(1-\alpha)$
:::

:::info
给定一个开放寻址的哈希表，负载因子 $\alpha = n/m < 1$，假定均匀独立哈希且没有删除，那么一次成功的查找所需要的期望探查次数最多是
$$
\frac{1}{\alpha} ln \frac{1}{1-\alpha}
$$
:::