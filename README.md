# 简陋菜菜的说明

### 目录结构

    ├─cute 不解释
    │  ├─.vuepress 不解释
    │  │  ├─components 公共组件,该目录下的组件是给md用的
    │  │  └─theme   不解释  
    │  │      ├─api 存放网络请求的函数
    │  │      ├─components 公共组件,vue用
    │  │      ├─storage 一些缓存的函数
    │  │      ├─store   不解释
    │  │      │  └─modules
    │  │      ├─styles  样式
    │  │      └─util    公共函数
    │  ├─Blog     博客文件
    │  ├─Commits  代码提交历程
    │  ├─Harem    友情链接
    │  ├─History  读书/观影  | 懒得改名字了
    │  ├─Message  留言板
    │  └─Twitter  心情
    └─Template    博客模板

[传送门](http://www.haibarai.com "要不要跳转去看看呢?")

### 安装依赖

    npm i

### Dev

    npm run dev

### 写博客

    blog.bat xxxxx(标题)

### Build

    .\build.bat

### Push(自己修改为你的地址)

    .\push.abt

### 预览

    Ctrl+shift+v

### 可能遇到问题

    Cannot find module 'webpack/lib/ModuleFilenameHelpers'

## 解决办法：
####  由于使用的是全局的 webpack，找不到某些目录，将全局的指向自己当前的项目即可。    

     npm link webpack