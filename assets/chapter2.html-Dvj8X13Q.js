import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as n,o as h}from"./app-BjfyJ5Pe.js";const l={};function k(t,s){return h(),a("div",null,s[0]||(s[0]=[n(`<h2 id="插入排序" tabindex="-1"><a class="header-anchor" href="#插入排序"><span>插入排序</span></a></h2><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">insertion_sort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(A,n)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> to n</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    key </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i]</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // Insert A[i] into the sorted subarray A[1:i-1].</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#A626A4;--shiki-dark:#ABB2BF;"> and</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> key</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">      A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> key</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="选择排序" tabindex="-1"><a class="header-anchor" href="#选择排序"><span>选择排序</span></a></h2><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">selection_sort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(A,n)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> to n </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">    // Find smallest element in A[i:n] and exchange with A[i].</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    smallest </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> to n</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">      if</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[smallest]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        smallest </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    exchange </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i] with </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[smallest]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="冒泡排序" tabindex="-1"><a class="header-anchor" href="#冒泡排序"><span>冒泡排序</span></a></h2><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">bubble_sort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(A,n)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> to n </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n downto i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">      if</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        exchange </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j] with </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="归并排序" tabindex="-1"><a class="header-anchor" href="#归并排序"><span>归并排序</span></a></h2><div class="language-c++ line-numbers-mode" data-highlighter="shiki" data-ext="c++" data-title="c++" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">merge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(A,p,q,r)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  n_l </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> q </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> p </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">       // length of A[p:q]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  n_r </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> r </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> q</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">           // length of A[q+1:r]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  let L </span><span style="--shiki-light:#A626A4;--shiki-dark:#ABB2BF;">and</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> R be </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">new</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> arrays</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> to n_l </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">  // copy to L</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    L</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[p </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i]</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> to n_r </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    R</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[q </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> +</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j]</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // copy to R</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> p</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n_l </span><span style="--shiki-light:#A626A4;--shiki-dark:#ABB2BF;">and</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n_r</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> L</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i] ≤ </span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">R</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">      A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[k] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> L</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    else</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[k] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> R</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n_l</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[k] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> L</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[i]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  while</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n_r</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">    A</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[k] </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> R</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[j]</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> j </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> k </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">merge_sort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(A,p,r)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">  if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> p ≥ r</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  q </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (p </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> r) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">/</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  merge_sort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(A,p,q)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  merge_sort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(A,q</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,r)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">  merge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(A,p,q,r)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)]))}const A=i(l,[["render",k],["__file","chapter2.html.vue"]]),d=JSON.parse('{"path":"/clrs/chapter2.html","title":"基础排序","lang":"zh-CN","frontmatter":{"title":"基础排序","icon":"book","order":1,"author":"被子","date":"2024-08-22T00:00:00.000Z","category":["算法"],"tag":["排序"],"description":"插入排序 选择排序 冒泡排序 归并排序","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://jgw2000.github.io/clrs/chapter2.html"}],["meta",{"property":"og:site_name","content":"博客演示"}],["meta",{"property":"og:title","content":"基础排序"}],["meta",{"property":"og:description","content":"插入排序 选择排序 冒泡排序 归并排序"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"被子"}],["meta",{"property":"article:tag","content":"排序"}],["meta",{"property":"article:published_time","content":"2024-08-22T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"基础排序\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-08-22T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"被子\\"}]}"]]},"headers":[{"level":2,"title":"插入排序","slug":"插入排序","link":"#插入排序","children":[]},{"level":2,"title":"选择排序","slug":"选择排序","link":"#选择排序","children":[]},{"level":2,"title":"冒泡排序","slug":"冒泡排序","link":"#冒泡排序","children":[]},{"level":2,"title":"归并排序","slug":"归并排序","link":"#归并排序","children":[]}],"readingTime":{"minutes":1.45,"words":436},"filePathRelative":"clrs/chapter2.md","localizedDate":"2024年8月22日","excerpt":"<h2>插入排序</h2>\\n<div class=\\"language-c++ line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"c++\\" data-title=\\"c++\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">insertion_sort</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">(A,n)</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">  for</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> i </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">=</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 2</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> to n</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    key </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">=</span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E5C07B\\"> A</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">[i]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic\\">    // Insert A[i] into the sorted subarray A[1:i-1].</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">    j </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">=</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> i </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">-</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">    while</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> j </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">&gt;</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 0</span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#ABB2BF\\"> and</span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E5C07B\\"> A</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">[j] </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">&gt;</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> key</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E5C07B\\">      A</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">[j </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">+</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 1</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">] </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">=</span><span style=\\"--shiki-light:#E45649;--shiki-dark:#E5C07B\\"> A</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">[j]</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">      j </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">=</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> j </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">-</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 1</span></span>\\n<span class=\\"line\\"><span style=\\"--shiki-light:#E45649;--shiki-dark:#E5C07B\\">    A</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">[j </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">+</span><span style=\\"--shiki-light:#986801;--shiki-dark:#D19A66\\"> 1</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\">] </span><span style=\\"--shiki-light:#A626A4;--shiki-dark:#C678DD\\">=</span><span style=\\"--shiki-light:#383A42;--shiki-dark:#ABB2BF\\"> key</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{A as comp,d as data};