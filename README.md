#  云开发竞赛作品-10ngui-ToGithuber

## 1. 作品简介
ToGithuber，诞生于2019年5月份，小程序是结合本人作为一名高校计算机专业的学生日常生活，平时希望能够在空闲的时候利用好零碎的时间，不仅能够实时跟进Github社区，了解互联网新鲜的新闻资讯以及刷刷leetcode，对于各大客户端app而言只是在零碎时间使用的需求而显得繁琐，因此利用小程序的即时即用的特点，能大限度的为程序员提供方便，充分利用碎片化时间。通过近一个月的个人独立开发，使用到小程序云开发，快速方便的实现了这个想法，“From Github,To Githuber”，也用来致敬Github社区.

## 2. 实现思路/架构图/流程图
### 小程序功能结构
![功能结构图](https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/gongnengdian.png)

子功能点 | 子功能描述 | 所属模块
------------- | ------------- | -------------
日周月项目趋势 | 实时获取github社区流行项目 | Github Trending
项目README查阅 | 查阅该项目的README（支持仓库markdown文件的跳转浏览）| Github Trending
用户（组织）信息浏览 | 查看项目所属组织或用户相关的信息及关联的其他项目 | Github Trending
用户及仓库搜索查阅 | 通过关键词对github中的用户及项目进行搜索 | Github Trending
图文介绍 | 以图文（封面加标题）的方式获取新闻资讯列表 | Developer News
语音播报 | 以语音播报（标题加语音）的方式获取新闻内容 | Developer News
详细内容阅读 | 进入新闻详细页面,阅读新闻内容，作者和出处 | Developer News
每日签到 | 记录自己的打卡签到记录 | Code Everyday
每日5题 | 小程序每天随机为用户分配5道题，供用户零碎时间刷题 | Code Everyday
收藏和笔记 | 用户可以对每日分配的题目进行收藏以及做笔记,并在个人中心查阅 | Code Everyday
题库分类查询 | 对题库进行标签以及难易程度分类便于用户针对性的整理和查询 | Code Everyday
### 小程序云开发架构
![架构图](https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/jiagou.png)

### 小程序功能模块

#### 登录验证
基本功能：用户点击登录验证按钮触发getUserInfo函数，其间获取用户的用户信息并调用云函数返回用户的openid存储本地缓存，时序图如下：
![登录](https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/login.png)

#### Github Trending
基本功能：使用Github api对开发者开放的基本功能，用户可以实时获取日，周，月的github trending中的优质项目，选择不同的编程语言，以及对项目，用户的查阅，因个人开发者小程序类别的限制，部分内容小程序提供了链接需要用户自行前往浏览器查阅。时序图如下:
![trending](https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/trending.png)

#### Developer News
基本功能:使用网络爬虫获取优质的互联网科技新闻后存储到本地的MongoDB数据库中，其中网络爬虫使用PySpider爬虫框架，并设置定时增量爬虫，每一个小时更新数据库中的新闻；在小程序端实现一个云函数使用mongodb模块对接远程的爬虫服务接口，调用云函数获取新闻内容并展示；同时使用百度的第三方语音广播开放平台的API，获取到新闻语音并在小程序端播放，时序图如下：
![news](https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/news.png)

#### Code Everyday
基本功能：使用网络爬虫一次性获取到leetcode官方的题库并保存到小程序的云数据库中，并设置该集合的权限为所有用户仅刻度，每天小程序推送5道随机的题目，并且用户记录下签到日，以及对题目进行收藏和笔记。

## 项目结果图例
![](https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/1.png)

<div align="center">
<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/2.png" height="561" width=323" >

<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/3.png" height="561" width="323" >


 </div>

<div align="center">
<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/4.png" height="561" width="323" >
<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/5.png" height="561" width="323" >

</div>

 <div align="center">

<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/6.png" height="561" width="323" >

<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/7.png" height="561" width="323" >

 </div>

<div align="center">
<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/8.png" height="561" width="323" >
<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/9.png" height="561" width="323" >

</div>

 <div align="center">

<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/10.png" height="561" width="323" >

<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/11.png" height="561" width="323" >

 </div>

<div align="center">
<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/12.png" height="561" width="323" >
<img src="https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/13.png" height="561" width="323" >

</div>


## 源码链接
[https://github.com/10ngui/ToGithuber](https://github.com/10ngui/ToGithuber)

## 小程序码
![](https://togithuber-1257562436.cos.ap-chengdu.myqcloud.com/ma.jpg)

## 详细开发文档
[https://github.com/10ngui/ToGithuber/blob/master/ToGithuber-converted.pdf](https://github.com/10ngui/ToGithuber/blob/master/ToGithuber-converted.pdf)
