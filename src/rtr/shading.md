---
# 这是文章的标题
title: 着色基础
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 3
# 设置作者
author: 被子
# 设置写作时间
date: 2024-10-27
# 一个页面可以有多个分类
category:
  - 实时渲染
# 一个页面可以有多个标签
tag:
  - 着色模型
# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 概览
```markmap
---
title: 着色
markmap:
  colorFreezeLevel: 1
---

## 光源
- 方向光
- 点光源
- 聚光灯
- 区域光
## 材质
- 漫反射
- 镜面反射
## 着色模型
- 真实感渲染
  - Lambertion
  - Blinn-Phong
  - PBR
  - Ray Tracing
- 非真实感渲染

```

## 光源
### 方向光
![](/rtr/images/shading_1.png)

### 点光源
![](/rtr/images/shading_2.png)

### 聚光灯
![](/rtr/images/shading_3.png)


## 着色模型
### Ambient
<div style="text-align: center;">
<img src="/rtr/images/shading_6.png" width="300" height="300"/>
</div>

$$
L_a = k_a \, I_a
$$

### Lambertian
<div style="text-align: center;">
<img src="/rtr/images/shading_4.png" width="300" height="300"/>
</div>

$$
L_d = k_d \, I_d \, max(0, \mathbf{n}\cdot \mathbf{l})
$$

### Blinn-Phong
<div style="text-align: center;">
<img src="/rtr/images/shading_5.png" width="300" height="300"/>
</div>

$$
L_s = k_s \, I_s \, max(0, \mathbf{n}\cdot \mathbf{h})^p
$$
其中 h 是半程向量，定义为
$$
\mathbf{h} = \frac{\mathbf{v} + \mathbf{l}}{\|\mathbf{v} + \mathbf{l}\|}
$$