module.exports = {
	root: 'www',
	build:'build-www',
	api:{
		use:'dev',
		dev:'https://demo.dev.com',
		build:'https://demo.build.com'
	},
	template:{
		use:true
	},
	base64Options: {
		baseDir :'',
		extensions: ['jpg', 'png'],
		exclude:['ios'],
		maxImageSize: 30*1024,
		debug: true
	}
}