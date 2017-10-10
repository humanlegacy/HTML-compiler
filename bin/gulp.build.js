var path = require('path');
	fs = require('fs'),
	conf = require('../gulp.config'),
	compile = require('../lib/compile'),
	realPath = require('../lib/realPath'),
    content = require('../lib/content'),
	copy = require('directory-copy'),
	thisDir = path.resolve(__dirname, '..'),
    argv = [];

//获得指令参数
try {    
	argv = JSON.parse(process.env.npm_config_argv).original;
}	catch(ex) {   
	argv = process.argv;
 }
var buildName = ( typeof argv[2] === 'undefined' ) ? 'build-'+conf.root : argv[2].substr(2)+'-'+conf.root;
var buildPath =  thisDir+'/'+buildName;

function unlinkDir(path) {
	var files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.statSync(curPath).isDirectory()) {
				unlinkDir(curPath)
			} else {
				fs.unlinkSync(curPath)
			}
		});
		fs.rmdirSync(path)
	}
};

fs.exists(buildPath, function(exists) {
	if (exists) {
		unlinkDir(buildPath)
	}
	fs.mkdir(buildPath, function(err) {
		if (err) {
			console.log(err);
			return
		}
		copy({
			src: conf.root,
			dest: buildPath,
			excludes: [/_dev/]
		}, function() {
			console.log('# copy success:' + buildPath);
            
            //删除转成base64后的图片源文件
			var images = realPath(buildName + '/images');
			images.forEach(function(filename) {
				fs.stat(filename, function(err, res) {
					if (res.size < conf.base64Options.maxImageSize) {
						fs.unlinkSync(filename)
					}
				})
			});
            
            //替换api变量
            var jsFilesCont = content(conf.root+'/_dev', '.js'),
                regExpAPI = /{{api}}/g,
                state = ( typeof argv[2] === 'undefined' ) ? 'build' : argv[2].substr(2);
            for (var _file in jsFilesCont) {
                var data = jsFilesCont[_file],
                    dataCont = data.content,
                    buildFile = data.path.replace(conf.root+'/_dev', buildName+'/assets');
                    while (api = regExpAPI.exec(dataCont)) {
                        dataCont = dataCont.replace(api[0],conf.api[state] );
                        fs.writeFileSync(buildFile, dataCont);
                        console.log("# [js] Compile has completed: " + buildFile)
                    }
            }
            
            //编译模板
			if (conf.template.use) {
				compile(null,function(buildFile, content){
					fs.writeFileSync(buildFile, content);
					console.log("# [html] Compile has completed: " + buildFile)
				},buildName)
			}
			console.log("# build success: " + buildPath)
            
		})
	})
})
