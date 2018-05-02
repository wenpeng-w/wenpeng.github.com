---
layout: post
date: 2018-04-29 22:44:53 +0800
title: SVN（TortoiseSVN）管理代码-分支合并
tags: SVN
author: 一文
post-img: "http://p3ethm2oh.bkt.clouddn.com/yiwen/posts/SVN_001.png"
---
为了便于开发团队的协同工作，版本库的有序迭代，主干稳定，分支清晰，创建分支管理就很有必要了。
主干用来发布稳定的版本，日常的开发则在分支上完成，之后再合并到主干上去。

首先找到本地存放项目的文件夹，进入文件夹会有一个 trunk 的文件夹和一个 branch 的文件夹，trunk 存放的是主干上的代码，branch 存放分支上的代码。接下来就开始你要进行的操作了。

## #合并分支到主干
1.找到 trunk 文件夹，鼠标右击 -> 选择 TortiseSVN -> 选择 merge

2.选择弹出窗口的第二个选项（Merge two different trees） -> 点击 Next >

3.From: 选择主干上的 url，To：选择分支上的 url -> 点击 Next >

4.点击 Test merge，查看能否正常合并，如果出现冲突会提示，就要修改冲突文件。如果正常，点击 Merge

5.合并成功。这时候主干上的代码就是最新的提交的分支上的代码了。

注：这只是本地代码的合并。 如果需要提交到远程版本库，进行 Commit 操作就可以了。



