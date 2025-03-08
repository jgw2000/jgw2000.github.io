---
# 这是文章的标题
title: CUDA 编程模型
# 你可以自定义封面图片
# cover: /assets/images/cover1.jpg
# 这是页面的图标
icon: book
# 这是侧边栏的顺序
order: 1
# 设置作者
author: 被子
# 设置写作时间
date: 2025-3-8
# 一个页面可以有多个分类
category:
  - cuda
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

## CPU VS GPU
![](/cuda/images/chapter1_1.png)

## Kernels
```C++
// Kernel 定义
__global__ void VecAdd(float* A, float* B, float* C)
{
    int i = threadIdx.x;
    C[i] = A[i] + B[i];
}

int main()
{
    // Kernel 调用
    VecAdd<<<1, N>>>(A, B, C);
}
```

## Thread Hierarchy
```C++
// Kernel 定义
__global__ void MatAdd(float A[N][N], float B[N][N], float C[N][N])
{
    int i = threadIdx.x;
    int j = threadIdx.y;
    C[i][j] = A[i][j] + B[i][j];
}

int main()
{
    // Kernel 调用
    int numBlocks = 1;
    dim3 threadsPerBlock(N, N);
    MatAdd<<<numBlocks, threadsPerBlock>>>(A, B, C);
}
```

:::tip
1. block 内的所有线程都运行在同一个 SM core 中，并且共享 core 中有限的内存资源，因此每一个 block 的线程数量存在上限。<br><br>
2. kernel 可以执行多个 blocks，多个 blocks 可以组成一维、二维或三维 grid 。
:::

![](/cuda/images/chapter1_2.png)

扩展 MatAdd 处理多个 blocks，代码如下：
```C++
// Kernel 定义
__global__ void MatAdd(float A[N][N], float B[N][N], float C[N][N])
{
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    int j = blockIdx.y * blockDim.y + threadIdx.y;
    if (i < N && j < N)
        C[i][j] = A[i][j] + B[i][j];
}

int main()
{
    // Kernel 调用
    dim3 threadsPerBlock(16, 16);
    dim3 numBlocks(N / threadsPerBlock.x, N / threadsPerBlock.y);
    MatAdd<<<numBlocks, threadsPerBlock>>>(A, B, C);
}
```

:::tip
1. 线程 blocks 的执行是独立的，可以是并行或者串行，也可以按任意顺序执行，从而使得 blocks 可以按照任意顺序调度到任意数量的 SM core 中。
<br><br>
2. block 内的线程可以通过共享内存分享数据，也可以通过调用 __syncthreads() 进行同步。
:::

### Thread Block Clusters <Badge text="*Compute Capability 9.0" type="tip" vertical="middle" />
:::tip
1. 在 block 和 grid 中间可以增加一层可选的 Thread Block Clusters，cluster 内的所有 blocks 都运行在同一个 GPU Processing Cluster (GPC) 中。
<br><br>
2. cluster 内的线程 blocks 可以访问分布式共享内存， 也可以通过 cluster.sync() 进行硬件支持的同步。
:::

![](/cuda/images/chapter1_3.png)

编译时指定 cluster size
```C++
// Kernel 定义
// 编译时 cluster size
__global__ void __cluster_dims__(2, 1, 1) cluster_kernel(float* input, float* output)
{
}

int main()
{
    float* input, *output;
    // Kernel 调用
    dim3 threadsPerBlock(16, 16);
    dim3 numBlocks(N / threadsPerBlock.x, N / threadsPerBlock.y);

    // The grid dimension must be a multiple of cluster size.
    cluster_kernel<<<numBlocks, threadsPerBlock>>>(input, output);
}
```

运行时指定 cluster size
```C++
// Kernel 定义
__global__ void cluster_kernel(float* input, float* output)
{
}

int main()
{
    float* input, *output;
    dim3 threadsPerBlock(16, 16);
    dim3 numBlocks(N / threadsPerBlock.x, N / threadsPerBlock.y);

    // Kernel 调用
    {
        cudaLaunchConfig_t config = {0};
        config.gridDim = numBlocks;
        config.blockDim = threadsPerBlock;

        cudaLaunchAttribute attribute[1];
        attribute[0].id = cudaLaunchAttributeClusterDimension;
        attribute[0].val.clusterDim.x = 2;
        attribute[0].val.clusterDim.y = 1;
        attribute[0].val.clusterDim.z = 1;
        
        config.attrs = attribute;
        config.numAttrs = 1;

        cudaLaunchKernelEx(&config, cluster_kernel, input, output);
    }
}
```

## Memory Hierarchy
![](/cuda/images/chapter1_4.png)