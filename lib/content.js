var conf = require('../gulp.config.js');
var fs = require('fs');
var path = require('path');

var temp = {};
var filesArray = [];

//获取模板内容
module.exports = {
	template:function(dir){
		var dir = path.resolve(__dirname, '..') + '/' + dir;
		var files = fs.readdirSync(dir);
		files.forEach(function(filename){
			var path = dir+ '/'+filename;
			filesArray.push(path);
		});
		return filesArray;
	},
	content: function(dir){
		var files =  module.exports.template(dir);
		for(var k=0;k<files.length;k++){
			var  extName = path.extname(files[k]), fileBaseName = path.basename(files[k] , extName);
			temp[fileBaseName] = fs.readFileSync(files[k],"utf-8");
		}
		return temp;
	}
}
