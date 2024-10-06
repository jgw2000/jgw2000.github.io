---
# 这是文章的标题
title: 基础排序
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 被子
# 设置写作时间
date: 2024-08-22
# 一个页面可以有多个分类
category:
  - 算法
# 一个页面可以有多个标签
tag:
  - 排序
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 插入排序

```C++
insertion_sort(A,n)
  for i = 2 to n
    key = A[i]
    // Insert A[i] into the sorted subarray A[1:i-1].
    j = i - 1
    while j > 0 and A[j] > key
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key
```

## 选择排序

```C++
selection_sort(A,n)
  for i = 1 to n - 1
    // Find smallest element in A[i:n] and exchange with A[i].
    smallest = i
    for j = i + 1 to n
      if A[j] < A[smallest]
        smallest = j
    exchange A[i] with A[smallest]
```

## 冒泡排序

```C++
bubble_sort(A,n)
  for i = 1 to n - 1
    for j = n downto i + 1
      if A[j] < A[j - 1]
        exchange A[j] with A[j - 1]
```

## 归并排序

```C++
merge(A,p,q,r)
  n_l = q - p + 1       // length of A[p:q]
  n_r = r - q           // length of A[q+1:r]
  let L and R be new arrays
  for i = 0 to n_l - 1  // copy to L
    L[i] = A[p + i]
  for j = 0 to n_r - 1
    R[j] = A[q + 1 + j] // copy to R

  i = 0
  j = 0
  k = p
  while i < n_l and j < n_r
    if L[i] ≤ R[j]
      A[k] = L[i]
      i = i + 1
    else A[k] = R[j]
      j = j + 1
    k = k + 1

  while i < n_l
    A[k] = L[i]
    i = i + 1
    k = k + 1

  while j < n_r
    A[k] = R[j]
    j = j + 1
    k = k + 1

merge_sort(A,p,r)
  if p ≥ r
    return
  q = (p + r) / 2
  merge_sort(A,p,q)
  merge_sort(A,q+1,r)
  merge(A,p,q,r)
```