# gulp-live

基于gulp扩展，前端开发自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。
> * 程序将为您建立虚拟静态服务器，自动打开浏览器（默认谷歌）,自动监听项目目录下文件的修改，浏览器会根据文件修改实时刷新。
> * 使用less将自动编译，小于您设置的图片文件大小时图片将被转成base64，同时样式文件将被压缩。
> * js文件也同时被监听和压缩。
> * 除此之外您还可以使用内置的模板引擎来创建公共内容，使其可以模块化开发。

## 1.安装gulp-live
首先全局安装gulp
```js
npm install gulp -g
```
再安装
```js
npm install gulp-live -g
```
到这里狞已经完成安装。
## 2.gulp.config 配置
在下载的项目模板中`gulp.config.js`为项目配置文件。
```js
{
    //配置项目根目录
    root: 'www',

    //编译目录
    build: 'build-www',	
	
    //在js文件中使用变量{{api}},指定不同开发环境
    api: {
        use: 'build',
        dev: 'http://127.0.0.1:3000',
        build: 'https://demo'
    },

    //模板
    template: {
        //是否启用模板
        use: true
    },

    //图片转base64，相关配置说明请查阅gulp-base64
    base64Options: {
        baseDir: '',
        extensions: ['jpg', 'png'],
        exclude: ['ios'],
        maxImageSize: 30 * 1024,
        debug: true
    },
}
```
## 3.在文件中使用模板变量
```js
//html模板
//自动应用`_dev/template`中的模板文件*.html
<template:header>

//css，引入css文件
<css:assets/css/index.css>

//js，引入js文件
<js:assets/js/index.js>   
```
## 4.初始化项目
新建一个项目项目，进入目录，打开命令行窗口键入并回车
```js
gulp-live
```
初始化项目模板，完成后接着
```js
npm install
```
安装项目模板相关依赖，至此完成全部安装
## 5.执行gulp-live
```js
//开发环境
npm run dev

//编译正式环境
npm run build
```

