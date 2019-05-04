---
layout: post
date: 2018-04-21 19:12:54 +0800
title: 【微信公众号】iOS微信内置浏览器获取签名无效
categories: 微信开发
tags: 微信公众号
author: 一文
post-img: "https://mmbiz.qpic.cn/mmbiz_png/AlibMLahN88AuHAtULflnsFYNUnwq8b6QkTTfpdMdcxHVnfCw9cZ3Jzj8lcicRYZzEyc4MibWFH7qQicV7qs1dVic7A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1"
---
**问题描述：**公司CRM管理系统，从客户列表页跳转到客户详情页，在详情页获取用户的位置信息时，获取配置信息的接口返回签名无效（ invalid signature ），刷新页面后就可以获取到签名。



在详情页使用微信 JS-SDK 获取用户的位置信息，需要拿到微信签名，再去调用微信的 getLocation 接口获取地理位置。可是这个时候 iOS 一直报签名无效的错误信息，Android 可以正确获取签名。



微信技术文档说明：

>所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（ 同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web app的页面会导致签名失败，此问题会在Android6.2中修复 ）。



项目使用的是 Vue 框架，Router 是 history 模式。查看代码最后终于定位到了问题所在。
+ iOS 微信： 其实使用 vue-router 切换页面时，只是操作浏览器的历史记录，页面的 URL 并不会发生变化，而获取签名的 URL 必须是当前页面的 URL，即就是第一次进入页面时的 URL。

+ Android 微信：切换路由时，页面的 URL 是会变化的，所以说获取签名的 URL 也就是当前页面的 URL。



找到了问题，接下来就是想办法解决问题（BUG）。知道是因为页面的 URl 没变，那就去拿第一次进入页面的 URL。在第一次进入页面的时候去记录页面的 URL，再去调用微信的接口获取签名，修改代码之后，测试每次点击进入详情页时就获取到了签名。



```js
// 记录进入 app 时的 url
if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
    window.entryUrl = location.href;
}
var pageUrl = /(Android)/i.test(navigator.userAgent) ? location.href : window.entryUrl;
```


Vue单页面应用，切换路由（ 跳转页面 ）时，iOS 微信内置浏览器获取微信签名无效的问题终于解决。