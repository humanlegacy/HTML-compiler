var conf = require('../gulp.config'),
		path = require('path'),
		files = require('./files');

module.exports = {
	view: function(dir){
		var dirArray = files(dir) , dir = path.resolve(__dirname, '..') +'/'+ conf.root;
		conf.view.files.forEach(function(filename){
			dirArray.push(dir+filename);
		});
		return dirArray;
	}
}

