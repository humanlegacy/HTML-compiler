var path = require('path');
var fs = require('fs');
var conf = require('../gulp.config');
var copy = require('../lib/copy');

var content = require('../lib/content');
var realPath = require('../lib/realPath');


var thisDir = path.resolve(__dirname,'..');
var buildPath = thisDir + '/' + conf.build;

function unlinkDir(path) {  
    var files = [];  
    if(fs.existsSync(path)) {  
        files = fs.readdirSync(path);  
        files.forEach(function(file, index) {  
            var curPath = path + "/" + file;  
            if(fs.statSync(curPath).isDirectory()) {
                unlinkDir(curPath);  
            } else {
                fs.unlinkSync(curPath);  
            }  
        });  
        fs.rmdirSync(path);  
    }  
};  

fs.exists(buildPath, function(exists){
	if(exists){
		unlinkDir(buildPath);
	}
	
	fs.mkdir(buildPath,function(err){
	   if (err) {
		   console.log(err);
		   return;
	   }
	   
	   copy(conf.root, buildPath,function(err){
			console.log('# copy success:'+ buildPath);
			 if(conf.template.use){
					var regExp = /<template:([a-z]+)>/g,
							contentList = content(conf.root,'.html');
							
					for(var name in contentList){
						var data = contentList[name];
						if( data.type == 'html' ){
							var fileCont = data.content;
							while(arr = regExp.exec(fileCont)){
								fileCont = fileCont.replace(arr[0], contentList[arr[1]].content);
							}
							var buildFile = data.path.replace( conf.root, conf.build );
							fs.writeFileSync(buildFile, fileCont);
							console.log( "# [html] Compile has completed: "+ buildFile);			
						}
					};
					
			 }
			unlinkDir(conf.build+'/_dev');
			
			var images = realPath(conf.build+'/images');	
			images.forEach(function(filename){
				fs.stat(filename,function(err,res){
					if(res.size > conf.base64Options.maxImageSize){
						fs.unlinkSync(filename);
					}
				});

			});
		    console.log( "# build success: "+ conf.build);
		   
	   });
	   
	});
	
	
})