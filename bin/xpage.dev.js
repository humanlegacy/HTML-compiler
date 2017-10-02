var url = require('url'),
		fs = require('fs'),
		path = require('path'),
		http = require('http'),
		livereload = require('livereload'),
		opn = opn = require('opn'),
		conf = require('../gulp.config.js'),
		contentFn = require('../lib/content'),
		types=require('../lib/types').types,
		replace = require('gulp-replace'),
		uglify = require('gulp-uglify');		

http.createServer(function (req, res) {
		var pathname = url.parse(req.url).pathname;
		var realPath = path.resolve(path.join("www", pathname));
		
		if(pathname == '/'){
			realPath += '/index.html'
		}

		//扩展名
		var ext = path.extname(realPath);
		ext = ext ? ext.slice(1) : 'unknown';
		
		fs.exists(realPath, function (exists) {
			if (!exists) {
				res.writeHead(404, {
					'Content-Type': 'text/plain'
				});
				res.write("This request URL " + pathname + " was not found on this server.");
				res.end();
			} else {
				var contentType = types[ext] || "text/plain";
				fs.readFile(realPath, "utf-8", function (err, content) {
					if(conf.template.use){
						var regExp = /<template:([a-z]+)>/g;
						var tempContent = contentFn.content(conf.template.dir);
						while(temp = regExp.exec(content)){
							content = content.replace(temp[0], tempContent[temp[1]]);
						}
						content = content.replace(/<body>/, "<body><script>document.write('<script src=\"http://127.0.0.1:35729/livereload.js?snipver=1\"></' + 'script>')</script>");
					}

					res.writeHead(200, {'Content-Type': contentType});
					res.write(content, "utf-8");
					res.end();
				});
			}
		});
	}).listen(8080);
	console.log( "# Server has started:	http://localhost:8080" );
	
var server = livereload.createServer();
server.watch(conf.root);
opn('http://localhost:8080', {app: 'chrome'});

var gulp = require('gulp'),
		less = require('gulp-less'),
		cssmin = require('gulp-minify-css'),
		base64 = require('gulp-base64'),
		base64Options = conf.base64Options;

fs.watch(conf.less.input,{ encoding: 'utf-8' },function(eventType, filename){
	if(eventType === 'change'){
		gulp.src(conf.less.input + '/' + filename)
			.pipe(less())
			.pipe(cssmin())
			.pipe(base64(base64Options))
			.pipe(gulp.dest(conf.less.output));
		console.log( "# [css] Compile has completed: "+ filename );	
	}
});

fs.watch(conf.javascript.input,{ encoding: 'utf-8' },function(eventType, filename){
	if(eventType === 'change'){
		gulp.src(conf.javascript.input + '/' + filename)
				.pipe(uglify())
				.pipe(replace(/{{api}}/g ,function() {
						return conf.api[conf.api.use];
					}))
				.pipe(gulp.dest(conf.javascript.output));
		console.log( "# [js] Compile has completed: "+ filename );		
	}
});

