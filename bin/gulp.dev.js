var url = require('url'),
	fs = require('fs'),
	path = require('path'),
	http = require('http'),
	livereload = require('livereload'),
	opn = opn = require('opn'),
	conf = require('../gulp.config.js'),
	compile = require('../lib/compile'),
	types = require('../lib/types').types,
	replace = require('gulp-replace'),
	gulp = require('gulp'),
	less = require('gulp-less'),
	cssmin = require('gulp-minify-css'),
	base64 = require('gulp-base64'),
	base64Options = conf.base64Options;
	
http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname;
	var realPath = path.resolve(path.join(conf.root));
	(pathname == '/') ? realPath += '/_html/index.html' : realPath += '/_html'+pathname;
	var ext = path.extname(realPath);	
	var name = path.basename(realPath, ext);
	ext = ext ? ext.slice(1) : 'unknown',compileCont = '';
	
	if(ext == 'html'){
		fs.exists(realPath, function(exists) {
			if (!exists) {
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.write("This request URL " + pathname + " was not found on this server.");
				res.end();
			}else{
				compile(name,function(path,content){
					var js = "<body><script>document.write('<script src=\"http://127.0.0.1:35729/livereload.js?snipver=1\"></' + 'script>')</script>";
					compileCont = content.replace(/<body>/, js);
				});
                res.write(compileCont, "utf-8"); 
				res.end();
			}
		});
	}else{
		realPath = path.resolve(path.join(conf.root)) + pathname;
		fs.exists(realPath, function(exists) {
			if (!exists) {
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.write("This request URL " + pathname + " was not found on this server.");
				res.end()
			}else{
				if( ['git','jpg','jpeg','png'].indexOf(ext) >= 0 ){
					res.write(fs.readFileSync(realPath, "base64"), "base64");
				}else{
					res.write(fs.readFileSync(realPath, "utf-8"), "utf-8");
				}
				res.end()
			}

		})
	}
}).listen(8080);
console.log("# Server has started:	http://localhost:8080");

var server = livereload.createServer();
server.watch(conf.root);
opn('http://localhost:8080', {
	app: conf.app
});

fs.watch(conf.root + '/assets/less', {encoding: 'utf-8'}, function(eventType, filename) {
	if (eventType === 'change') {
		gulp.src(conf.root + '/assets/less/' + filename)
				.pipe(less())
				.pipe(cssmin())
				.pipe(base64(base64Options))
				.pipe(gulp.dest(conf.root + '/assets/css'));
		console.log("# [css] Compile has completed: " + filename)
	}
});