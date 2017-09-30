var conf = require('../gulp.config');
var path = require('path');
var fs = require('fs');

function files(_dir){
	var 	filesArray = [];
	var dir = path.resolve(__dirname, '..') + '/' + _dir;
	var files = fs.readdirSync(dir);
	files.forEach(function(filename){
		var path = dir+ '/'+filename;
		if(fs.statSync(path).isDirectory()){
			module.exports.files(_dir+'/'+filename);
		}else{
			filesArray.push(path);
		}
	});
	return filesArray;
}

//页面绝对路劲
module.exports = {
	view: function(dir){
		var dirArray = files(dir) , dir = path.resolve(__dirname, '..') +'/'+ conf.baseDir
		conf.view.files.forEach(function(filename){
			dirArray.push(dir+filename);
		});
		return dirArray;
	}
}

