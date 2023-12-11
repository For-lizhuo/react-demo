---
title: 无限滚动
nav:
  title: demo
  path: /common
group:
  title: 性能优化
---
# 无限滚动

## 介绍

当展示大批量相同类型的数据时，一次性完成数据的请求和渲染会导致性能问题，常规的方案有分页加载，但这需要用户手动点击按钮（跳转到指定页面）。无限滚动是另一种方案，当页面滚动到底部时自动请求新的数据加载，对于用户来说操作更加便捷。

## 实现方案

通常的实现方式是监听`scroll事件`，动态计算滚动条离页面底部的距离，当满足一定条件时请求数据加载，但这一过程会导致很高频率的重排，影响网站的性能，更好的一种实现方式是基于`IntersectionObserver API`.

## IntersectionObserver API

Intersection Observer API 提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。可以应用在图片懒记载，无限滚动等场景。

[参考MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

## 示例

1.通过IntersectionObserver()构造函数创建一个IntersectionObserver实例，构造函数中需要传入一个回调函数，这个函数中会模拟网络请求加载数据，并修改列表渲染的数据源state触发重新渲染显示新的数据。

2.调用IntersectionObserver实例的observer方法绑定需要监听的DOM元素.
<code src="./index.tsx"></code>