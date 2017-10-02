module.exports = {
	root: 'www/',
	api:{
		use:'build',
		dev:'https://demo.dev.com',
		build:'https://demo.build.com'
	},
	view:{
		dir: 'www/view',
		files:['index.html']
	},
	template:{
		use:true,
		dir:'www/_template'
	},
	less: {
		input: 'www/_dev/less',
		output:  'www/assets/css'
	},
	javascript:{
		input:'www/_dev/js/',
		output:  'www/assets/js'
	},
	base64Options: {
		baseDir :'',
		extensions: ['jpg', 'png'],
		exclude:['ios'],
		maxImageSize: 30*1024,
		debug: true
	}
}