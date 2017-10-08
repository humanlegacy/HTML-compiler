var fs = require('fs'),
	path = require('path'),
	realpath = require('./realpath'),
	conf = require('../gulp.config');

module.exports = function(dir, ext) {
	var file = realpath(dir, ext),
		content = {};

	for (var k = 0; k < file.length; k++) {
		var thisPath = file[k],
			name = path.basename(thisPath, ext);
		content[name] = {};
		content[name].content = fs.readFileSync(thisPath, "utf-8");
		content[name].path = thisPath;
		content[name].type = (thisPath.indexOf('_dev/template') < 0 ? ext.substr(1) : 'template');
	}
	return content;
}