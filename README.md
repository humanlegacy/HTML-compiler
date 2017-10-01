# gulp-live


基于gulp扩展，自动化构建工具,开发者可以使用它在项目开发过程中自动执行常见任务.

> * 监听文件修改，浏览器实时刷新预览
> * 编译less，压缩css，js
> * 图片转base64
> * 支持模板引擎



## 1.安装gulp-live
首先全局安装gulp
```js
npm install gulp -g
```
再安装
```js
npm install gulp-live -g
```
完成之后进入到你的项目目录，安装项目模板，打开命令行窗口键入并回车
```js
gulp-live
```
最后
```js
npm install
```
安装项目模板相关依赖，至此完成安装。
## 2.gulp.config 配置
在下载的项目模板中`gulp.config.js`为项目配置文件。
```js
//配置项目根目录
baseDir: 'smart/'

//在js文件中使用变量{{api}},指定不同开发环境
api:{
    use:'build',
    dev:'http://127.0.0.1:3000',
    build:'https://demo'
}

//配置监听的目录与文件
watchFile: [
    '*.html',
    'view/*.html', 
    'assets/css/*.css',
    'assets/js/*.js'
]

//视图文件（html）目录
view:{
    dir: 'smart/view',
    files:['index.html']
}

//模板相关配置
template:{
    //是否启用模板
	use:true,
	//指定模板目录
	dir:'smart/_template',
	//在视图文件（html）中的模板标示
	sign:{
	    //属性：模板名称
	    //值：对应模板标示
		header:/<!--template:header-->([\s\S]*)<!--template:header-->/,
		body:/<!--template:body-->([\s\S]*)<!--template:body-->/,
		footer:/<!--template:footer-->([\s\S]*)<!--template:footer-->/
	}
}

//less文件件编译的输入输出目录
less: {
	input: 'smart/_dev/less',
	output:  'smart/assets/css'
}

//js文件压缩输入输出目录
javascript:{
	input:'smart/_dev/js/*.js',
	output:  'smart/assets/js'
}

//图片转base64，相关配置说明请查阅gulp-base64
base64Options: {
	baseDir :'',
	extensions: ['jpg', 'png'],
	exclude:['ios'],
	maxImageSize: 30*1024,
	debug: true
}
```


