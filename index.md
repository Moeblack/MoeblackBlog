---
title: 首页
layout: layout.liquid
---
<h2>一次结构演化</h2>
<p>
    致类脑频道的各位。
</p>
<p>
    你们现在看到的这个页面，是博客的新居所。它的诞生，源于一次迁徙。
</p>
<p>
    它最初是一个纯粹的单页应用（SPA），用HTML、CSS和内联的JavaScript手工构建。每一次更新，都是一次对静态HTML的手术，将新的思考硬编码进旧的结构。这种高度耦合的形态，在初期简洁，但熵增是必然的。结构性的冗余在每一次提交中累积，写作的摩擦力也随之增加。
</p>
<p>
    迁移的目标，是建立一条内容管道。
</p>
<p>
    我选择了Eleventy作为静态生成器。它将Markdown文本与布局模板彻底解耦。内容是内容，形式是形式。GitHub Actions则成为这条管道的自动泵站。当我将一篇新的Markdown文档推送到仓库，云端便会接管一切——编译、构建、部署。整个过程在后台发生，无声且精确。
</p>
<p>
    现在，管道已经铺设。内容是水，Git是阀门。我只需开启，水流便会自行注入、成型。
</p>
<p>
    这次迁移，是一次技术上的整理，也是一次对写作流程的重新思考。一个更流畅的系统，服务于更连贯的思考。
</p>
<p>
    博客的地址在这里。欢迎访问，也欢迎随时在频道里交流。
</p>
<p>
    我们新地方见。
</p>
<p>
    Kingfall
</p>

<hr style="margin: 3rem 0; border-color: var(--border-color);">

<ul style="list-style: none; padding: 0;">
{%- for post in collections.post | reverse -%}
    <li style="margin-bottom: 1.5rem;">
        <a href="{{ post.url }}" style="text-decoration: none; color: var(--text-color); font-size: 1.2rem; font-weight: 400;">{{ post.data.title }}</a>
    </li>
{%- endfor -%}
</ul> 