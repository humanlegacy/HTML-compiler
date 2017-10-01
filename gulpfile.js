var conf = require('./gulp.config.js');

var browserSync = require('browser-sync'),
		reload = browserSync.reload,
		gulp = require('gulp'),
		less = require('gulp-less'),
		watch = require('gulp-watch'),
		cssmin = require('gulp-minify-css'),
		base64 = require('gulp-base64'),
		base64Options = conf.base64Options;


//编译less
gulp.task('less',function(){
	gulp.src(conf.less.input + '/*.less')
		.pipe(watch(conf.less.input + '/*.less'))
		.pipe(less())
		.pipe(cssmin())
		.pipe(base64(base64Options))
		.pipe(gulp.dest(conf.less.output));
 });

 //压缩js
 var replace = require('gulp-replace');
 var uglify = require('gulp-uglify');
 gulp.task("minJS",function(){
    gulp.src(conf.javascript.input)
	.pipe(watch(conf.javascript.input))
	.pipe(uglify())
	.pipe(replace(/{{api}}/g ,function() {
			return conf.api[conf.api.use];
		}))
	.pipe(gulp.dest(conf.javascript.output));
})
 
 //模板解析
var fs = require('fs');
var viewFilesFn = require('./lib/view');
var contentFn = require('./lib/content');
gulp.task('templates', function(){
	if(!conf.template.use) return;
	var viewFiles = viewFilesFn.view(conf.view.dir) , 
			content = contentFn.content(conf.template.dir);
	viewFiles.forEach(function(file){
		var data = fs.readFileSync(file,'utf-8');
		for(var name in conf.template.sign){
			if(conf.template.sign[name].test(data)){
				data = data.replace(conf.template.sign[name], "<!--template:"+name+"-->"+content[name]+"<!--template:"+name+"-->");
			}
		}
		fs.writeFileSync(file, data);
		console.log('Template Done!');
	});

});

if(conf.template.use){
	gulp.watch(conf.template.dir+'/*.html' ,['templates']);
}

 
//启动服务 
gulp.task('default',['less','minJS','templates'], function() {
	browserSync({
		server: {
			baseDir: conf.root
		}
	});
	gulp.watch(conf.watchFile ,{cwd: conf.root}, reload);
});
 
