var content = require('./content');
var conf = require('../gulp.config.js');


module.exports = function(file,callback){
	var regExpTpl = /<template:([\w-]+)>/g,
			regExpCss = /<css:([\w-\/\.]+\.css)>/g,
			regExpJs = /<js:([\w-\/\.]+\.js)>/g,
			htmlFilesCont = content(conf.root, '.html');

	function compileFile(data){
			var content = data.content;
			
			//template	
			while (tpl = regExpTpl.exec(content)) {
				content = content.replace(tpl[0], htmlFilesCont[tpl[1]].content)
			}
			
			//css
			while (css = regExpCss.exec(content)) {
				content = content.replace(css[0], "<link rel='stylesheet' href='"+css[1]+"' type='text/css'>")
			}
			
			//js
			while (js = regExpJs.exec(content)) {
				content = content.replace(js[0], "<script type='text/javascript' src='"+js[1]+"'></script>")
			}
			
			
			if(callback){
				var buildFile = data.path.replace('/_html', '');
				callback(buildFile, content);
			}	
	}		
			
	if(file === null){
		for (var _file in htmlFilesCont) {
            if (htmlFilesCont[_file].type == 'html') {
                compileFile(htmlFilesCont[_file]);   
            }
		}		
	}else{
		compileFile(htmlFilesCont[file]);
	}
	
}
