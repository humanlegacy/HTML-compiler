module.exports = {
	root: 'www',
	api:{
		use:'dev',
		dev:'http://127.0.0.1',
		build:'http://www.hello-ui.com'
	},
	template:{
		use:true
	},
	base64Options: {
		baseDir :'',
		extensions: ['jpg', 'png'],
		exclude:['ios'],
        //15KB以下图片将被压缩成base64
		maxImageSize: 15*1024,
		debug: true
	},
    app:['google chrome','chrome']
}