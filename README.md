# 欢迎使用前端模板引擎

> * 前端模块化开发，生成传统html+css+js，并可在本地直接打开浏览
> * less预编译，压缩代码，图片转base64
> * 实时监听文件修改，浏览页面自动更新
> * 编写公共模块，可在多页面引入

### [点击这里下载工程文件](https://github.com/749264345/HTML-Template-Engine/archive/master.zip)
1.解压后，进入目录 npm install 安装依赖；
2.npm run dev 默认自动打开chrome；
3.npm run build 编译静态文件；
#### 说明
1.默认执行目录为www，可配置更改；
2.www／template目录为公共模板，用于在其他页面引用；
#### 引用模板

    <template:header>
    //header为www／template目录中的header.html静态文件
    //请遵循以英文+html为后缀的文件名