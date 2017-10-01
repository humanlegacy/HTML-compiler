var fs = require('fs'),
		path = require('path'),
		files = require('./files'),
		temp = {};

module.exports = {
	content: function(dir){
		var file =  files(dir);
		for(var k=0;k<file.length;k++){
			var  extName = path.extname(file[k]), fileBaseName = path.basename(file[k] , extName);
			temp[fileBaseName] = fs.readFileSync(file[k],"utf-8");
		}
		return temp;
	}
}
