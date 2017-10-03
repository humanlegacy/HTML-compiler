var content = require('./content');
var conf = require('../gulp.config.js');


module.exports = function(file,callback){
	var arg = arguments,
			regExpTpl = /<template:([a-z]+)>/g,
			regExpCss = /<css:([a-z\/\.]+\.css)>/g,
			regExpJs = /<js:([a-z\/\.]+\.js)>/g,
			htmlFilesCont = content(conf.root, '.html');

	function compileFile(data){
		if (data.type == 'html') {
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
			
			var buildFile = data.path.replace(conf.root, conf.build);
			if(arg[arg.length-1]){
				arg[arg.length-1](buildFile, content);
			}	
		}
	}		
			
	if(arg.length === 1){
		for (var _file in htmlFilesCont) {
			compileFile(htmlFilesCont[_file]);
		}		
	}
	
	if(arg.length === 2){
		compileFile(htmlFilesCont[file]);
	}
	
}
