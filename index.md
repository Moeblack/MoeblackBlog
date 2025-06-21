---
title: 首页
layout: layout.liquid
---

<style>
.post-list {
    list-style: none;
    padding: 0;
}
.post-list-item {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1.5rem;
    transition: border-color 0.5s var(--ease-out-quart);
}
.post-list-item:last-child {
    border-bottom: none;
}
.post-list-link {
    text-decoration: none;
    color: var(--title-color);
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;
    transition: color 0.3s var(--ease-out-quart);
}
.post-list-link:hover {
    color: var(--accent-color);
}
</style>

<ul class="post-list">
{%- for post in collections.post | reverse -%}
    <li class="post-list-item">
        <a href="{{ post.url }}" class="post-list-link">{{ post.data.title }}</a>
    </li>
{%- endfor -%}
</ul> 