var fs = require('fs'),
		path = require('path'),
		realpath = [];
		
function files(dir, ext){
	var newdir = path.resolve(__dirname, '..') + '/' + dir,
			fileArray = fs.readdirSync(newdir);
			
	fileArray.forEach(function(filename){
		
		var _realpath = newdir+ '/'+filename,
				extName = path.extname(_realpath);

		if( fs.statSync(_realpath).isDirectory() ){
			files(dir+'/'+filename, ext);
		}else{
			if( typeof ext === 'undefined' ){
				realpath.push(_realpath);
			}else{
				if( ext === extName ){
					realpath.push(_realpath);
				}
			}
		}
		
	});
	
	return realpath;
}

module.exports = function(dir, ext){
	realpath = [];
	return files(dir, ext);
};
