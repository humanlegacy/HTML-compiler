var url = require('url'),
	fs = require('fs'),
	path = require('path'),
	http = require('http'),
	livereload = require('livereload'),
	opn = opn = require('opn'),
	conf = require('../gulp.config.js'),
	content = require('../lib/content'),
	types = require('../lib/types').types,
	replace = require('gulp-replace'),
	uglify = require('gulp-uglify'),
	gulp = require('gulp'),
	less = require('gulp-less'),
	cssmin = require('gulp-minify-css'),
	base64 = require('gulp-base64'),
	base64Options = conf.base64Options;
	
http.createServer(function(req, res) {
	var pathname = url.parse(req.url).pathname,
		realPath = path.resolve(path.join(conf.root, pathname));
	if (pathname == '/') {
		realPath += '/index.html'
	}
	var ext = path.extname(realPath);
	ext = ext ? ext.slice(1) : 'unknown';
	fs.exists(realPath, function(exists) {
		if (!exists) {
			res.writeHead(404, {
				'Content-Type': 'text/plain'
			});
			res.write("This request URL " + pathname + " was not found on this server.");
			res.end()
		} else {
			var contentType = types[ext] || "text/plain";
			fs.readFile(realPath, "utf-8", function(err, html) {
				if (conf.template.use) {
					var regExp = /<template:([a-z]+)>/g,
						htmlCont = content(conf.root + '/_dev/template', '.html');
					while (arr = regExp.exec(html)) {
						html = html.replace(arr[0], htmlCont[arr[1]].content)
					}
					html = html.replace(/<body>/, "<body><script>document.write('<script src=\"http://127.0.0.1:35729/livereload.js?snipver=1\"></' + 'script>')</script>")
				}
				res.writeHead(200, {
					'Content-Type': contentType
				});
				res.write(html, "utf-8");
				res.end()
			})
		}
	})
}).listen(8080);
console.log("# Server has started:	http://localhost:8080");

var server = livereload.createServer();
server.watch(conf.root);
opn('http://localhost:8080', {
	app: 'chrome'
});

fs.watch(conf.root + '/_dev/less', {encoding: 'utf-8'}, function(eventType, filename) {
	if (eventType === 'change') {
		gulp.src(conf.root + '/_dev/less/' + filename).pipe(less()).pipe(cssmin()).pipe(base64(base64Options)).pipe(gulp.dest(conf.root + '/assets/css'));
		console.log("# [css] Compile has completed: " + filename)
	}
});

fs.watch(conf.root + '/_dev/js', {encoding: 'utf-8'}, function(eventType, filename) {
	if (eventType === 'change') {
		gulp.src(conf.root + '/_dev/js/' + filename).pipe(uglify()).pipe(replace(/{{api}}/g, function() {
			return conf.api[conf.api.use]
		})).pipe(gulp.dest(conf.root + '/assets/js'));
		console.log("# [js] Compile has completed: " + filename)
	}
});