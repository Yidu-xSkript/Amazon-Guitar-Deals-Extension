let mix = require('laravel-mix')
mix.setPublicPath('./')
	.sass('src/scss/popup.scss', 'dist/css')
	// .js('src/js/background.js', 'dist/js')
	.js('src/js/index-popup.js', 'dist/js').vue()
	.copy('src/images/', 'dist/images')
	.options({
		processCssUrls: false
	})