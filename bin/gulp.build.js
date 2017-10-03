var path = require('path');
	fs = require('fs'),
	conf = require('../gulp.config'),
	compile = require('../lib/compile'),
	realPath = require('../lib/realPath'),
	copy = require('directory-copy'),
	thisDir = path.resolve(__dirname, '..'),
	buildPath = thisDir + '/' + conf.build;

function unlinkDir(path) {
	var files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) {
				unlinkDir(curPath)
			} else {
				fs.unlinkSync(curPath)
			}
		});
		fs.rmdirSync(path)
	}
};

fs.exists(buildPath, function(exists) {
	if (exists) {
		unlinkDir(buildPath)
	}
	fs.mkdir(buildPath, function(err) {
		if (err) {
			console.log(err);
			return
		}
		copy({
			src: conf.root,
			dest: buildPath,
			excludes: [/_dev/]
		}, function() {
			console.log('# copy success:' + buildPath);
			var images = realPath(conf.build + '/images');
			images.forEach(function(filename) {
				fs.stat(filename, function(err, res) {
					if (res.size > conf.base64Options.maxImageSize) {
						fs.unlinkSync(filename)
					}
				})
			});
			if (conf.template.use) {
				compile(function(buildFile, content){
					fs.writeFileSync(buildFile, content);
					console.log("# [html] Compile has completed: " + buildFile)
				})
			}
			console.log("# build success: " + conf.build)
		})
	})
})