# 简陋菜菜的说明

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