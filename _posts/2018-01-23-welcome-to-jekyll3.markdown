---
layout: post
title:  "VueJS 2.0 的API更新"
date:   2018-01-26 08:32:40 +0800
categories: 框架
tags: Vue
post-img: "http://oq3m63ave.bkt.clouddn.com/0618/Vuejs1.png"
author: Yiwen
---
![VueJS](http://oq3m63ave.bkt.clouddn.com/0618/Vuejs1.png)
##### 1.组件模板

- 必须有一个根元素，包住所有的元素

##### 2.组件定义

```js
    var A = {   // vue2.0 定义组件方式
      template: '#a',
      ...
    };

    // Vue.component('my-a',A);
    new Vue({
      ...
      components:{
        'my-a': A
      }
    });
```

##### 3.生命周期
- vue2.0之前：
    - init -----------------> 组件实例刚被创建
    - created -----------> 实例已经创建，已经有属性，但是DOM 未生成
    - beforeCompile --> 模板编译之前
    - compiled ---------> 模板已经编译
    - ready -------------> 渲染 √
    - beforeDestroy --> 销毁之前
    - destroyed --------> 销毁

    - vue2.0：
    - beforeCreate -----> 组件实例刚被创建，没有属性
    - created ------------> 实例已经创建，已经有属性，但是DOM 未生成
    - beforeMount -----> 模板编译之前
    - mounted ----------> 模板编译完成，代替之前的ready
    - beforeUpdate ----> 组件更新之前
    - update ------------> 组件更新完成
    - beforeDestroy ---> 销毁之前
    - destroyed ---------> 销毁

##### 4.循环

- 1.默认就可以添加重复数

- 2.去掉一些隐式变量： $index、$key

```js
    // 第一个参数为 val，第二个参数为 index
    <li v-for="(val, index) in values" :key="index">
        {{val}} {{index}}
    </li>
```
```js
    // 1.0 第一个参数为 index，第二个参数为 val
    <li v-for="(val, index) in values" :track-by="index">
        {{val}} {{index}}
    </li>
```
##### 5.自定义键盘指令

```js
    // vue 1.0
    Vue.directive('on').keyCode.enter = 13;
    <input type="text" @keyup.enter="change">

    // vue 2.0
    Vue.config.keyCodes.ctrl = 17;
    <input type="text" @keyup.ctrl="change">
```
##### 6.过滤器
-- lodash 工具库

-- 官网：https://lodash.com/

-- 中文文档：http://lodashjs.com/docs/#_chunkarray-size1

```js
    // vue 2.0 内置过滤器全部删除

    {msg | currency}  // 货币转换
    json
    limitBy 2 4     // 限制数组元素的个数 第一个参数是限制个数 2，第二个参数是位置 4
    filterBy 'w'    // 过滤显示的内容 'w'
    ...
```
###### 6.1 自定义过滤器

```js
    Vue.filter('toDou',function(input, a, b){
        return input < 10 ? '0' + input : '' + input
        // consloe.log(input);
    });

    // 过滤器传参发生变化
    {msg | toDou '3' '1'}     // vue 1.0
    {msg | toDou('3','1')}    // vue 2.0
```
##### 7.动画
-- vue 1.0 transition 是属性 添加到元素上

```js
    // html
    <p targsition="fade"></p>

    // css
    .fade-transition{}
    .fade-enter{}   // 进入动画
    .fade-leave{}   // 离开动画
```

vue 2.0 transition 是组件 <transition></transition>
```js
// html
<transition name="fade"
    @before-enter="beforeEnter"         // 动画进入之前
    @enter="enter"                      // 动画进入
    @after-enter="afterEnter"           // 动画进入之后
    @before-leave="beforeLeave"         // 动画离开之前
    @leave="leave"                      // 动画离开
    @after-leave="afterLeave"           // 动画离开之后
>
    // 动画（元素、属性、路由）
    <p></p>
</transition>

// css
.fade-enter{}           // 初始状态
.fade-enter-avtive{}    // 变化 -->显示
.fade-leave{}           // 最终状态
.fade-leave-active{}    // 变化 -->隐藏

// animate.css 库配合使用
<transition enter-active-class="fadeIn" leave-active-class="fadeOut">
    <p class="animated"></p>
</transition>
// 或者
<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <p></p>
</transition>
```
多个元素动画 <transition-group></transition-group>

```js
<transition-group enter-active-class="fadeIn" leave-active-class="fadeOut">
    <p class="animated" :key="1"></p>
    <p class="animated" :key="2"></p>
</transition-group>
```
##### 8.vue 2.0 路由配置

```js
// 引入 vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// html
// 创建组件
<router-link to="/home"></router-link>

// 配置路由
const routes = [
    {path: '/home', component: Home},
    {
        path: '/user',
        component: User
        children:[
            {path: ':username/age/:age', component: UserInfo}   // /user/yiran/age=20
        ]
    },
    ...
    {path: '/', redirect: '/home'}  // 默认页 router.redirect 已经废弃
];

// 生成路由实例
const router = new VueRouter({
    routes
});

// 挂载在 vue 上
new Vue({
    el: 'body',
    router
});
```
###### 8.1 路由实例方法

```js
// 直接添加一个路由，表现是切换路由，本质是往历史记录里面添加一个
router.push({path: '/home'});

// 替换路由，表现是切换路由，但是不会往历史记录里面添加
router.replace({path:'/user'});
```
###### 8.1 路由配合动画

```js
<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <router-view></router-view>
</transition>
```
