---
# 这是文章的标题
title: 体积渲染
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 7
# 设置作者
author: 被子
# 设置写作时间
date: 2025-11-09
# 一个页面可以有多个分类
category:
  - 实时渲染
# 一个页面可以有多个标签
tag:

# 此页面会在文章列表置顶
# sticky: true
# 此页面会出现在星标文章中
# star: true
# 你可以自定义页脚
# footer: 这是测试显示的页脚
# 你可以自定义版权信息
# copyright: 无版权
---

## 光线散射理论
### 参与介质
![](/rtr/images/volume_1.png)

![](/rtr/images/volume_2.png)

媒介的反射率 $\rho$ 定义为：
$$
\rho = \frac{\sigma_s}{\sigma_s + \sigma_a} = \frac{\sigma_s}{\sigma_t}
$$

在参与介质的影响下，光在传播过程中的辐射度不再保持不变，某点的入射辐射度可以根据以下等式描述为（假设光源是无穷小的点光源）：
$$
L_i(c,-v) = T_r(c,p)L_o(p,v)+\int_{t=0}^{\|p-c\|} T_r(c,c-vt)L_{scat}(c-vt,v)\sigma_s dt
$$
![](/rtr/images/volume_3.png)