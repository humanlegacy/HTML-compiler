var fs = require('fs'),
		path = require('path'),
		temp = [];
		
function files(_dir){
	var dir = path.resolve(__dirname, '..') + '/' + _dir;
	var fileArray = fs.readdirSync(dir);
	fileArray.forEach(function(filename){
		var path = dir+ '/'+filename;
		if(fs.statSync(path).isDirectory()){
			files(_dir+'/'+filename);
		}else{
			temp.push(path);
		}
	});
	return temp;
}

module.exports = function(_dir){
	temp = [];
	return files(_dir);
};