var fs = require('fs'),
		compile = require('../lib/compile');

compile(null,function(buildFile, content){
	fs.writeFileSync(buildFile, content);
	console.log("# [html] Compile has completed: " + buildFile);
});
