module.exports = {
	root: 'smart/',
	api:{
		use:'build',
		dev:'https://demo.dev.com',
		build:'https://demo.build.com'
	},
	watchFile: [
		'*.html',
		'view/*.html', 
		'assets/css/*.css',
		'assets/js/*.js'
	], 
	view:{
		dir: 'smart/view',
		files:['index.html']
	},
	template:{
		use:true,
		dir:'smart/_template',
		sign:{
			header:/<!--template:header-->([\s\S]*)<!--template:header-->/,
			body:/<!--template:body-->([\s\S]*)<!--template:body-->/,
			footer:/<!--template:footer-->([\s\S]*)<!--template:footer-->/
		}
	},
	less: {
		input: 'smart/_dev/less',
		output:  'smart/assets/css'
	},
	javascript:{
		input:'smart/_dev/js/*.js',
		output:  'smart/assets/js'
	},
	base64Options: {
		baseDir :'',
		extensions: ['jpg', 'png'],
		exclude:['ios'],
		maxImageSize: 30*1024,
		debug: true
	}
}