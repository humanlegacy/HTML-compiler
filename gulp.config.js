module.exports = {
	root: 'www/',
	api:{
		use:'build',
		dev:'https://demo.dev.com',
		build:'https://demo.build.com'
	},
	watchFile: [
		'*.html',
		'view/*.html', 
		'view/*/*.html', 
		'assets/css/*.css',
		'assets/js/*.js'
	], 
	view:{
		dir: 'www/view',
		files:['index.html']
	},
	template:{
		use:true,
		dir:'www/_template',
		sign:{
			header:/<!--template:header-->([\s\S]*)<!--template:header-->/,
			body:/<!--template:body-->([\s\S]*)<!--template:body-->/,
			footer:/<!--template:footer-->([\s\S]*)<!--template:footer-->/
		}
	},
	less: {
		input: 'www/_dev/less',
		output:  'www/assets/css'
	},
	javascript:{
		input:'www/_dev/js/*.js',
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