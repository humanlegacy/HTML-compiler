module.exports = {
	root: 'www',
	base64Options: {
		extensions: ['jpg', 'png'],
		exclude:['ios'],
        //10KB以下图片将被压缩成base64
		maxImageSize: 10*1024
	},
    app:['chrome'],
   //app:['google chrome']
}