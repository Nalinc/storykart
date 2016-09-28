//External Node Modules
var express = require('express');
var path = require('path');
var compression = require('compression');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('./config');
var port = process.env.PORT || 8000;

// Express App 
var app = require('./app');

app.use(compression());

var isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
	compiler = webpack(config)

	// We give notice in the terminal when it starts bundling and
	// set the time it started
	compiler.plugin('compile', function() {
		console.log('Bundling...');
		bundleStart = Date.now();
	});

	// We also give notice when it is done compiling, including the
	// time it took.
	compiler.plugin('done', function() {
		console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
	});

	app.use(webpackDevMiddleware(compiler, {
	    publicPath: config.output.publicPath,
	    // Configure hot replacement
	    hot: true,
	    log: false,
	    // The rest is terminal configurations
	    quiet: false, //output anything to the console.
	    noInfo: true //suppress useless information
	}))
	app.use(express.static(path.resolve(__dirname, './../src/assets')));
	app.use(webpackHotMiddleware(compiler, {}))
} else {
    // Accessing the static assets from the dist in production environment
    app.use(express.static(path.resolve(__dirname, './../')));
    app.use(express.static(path.resolve(__dirname, './../build/assets')));
}

app.listen(port, function () {
  console.log('Express server running in '+ process.env.NODE_ENV +' mode on port ' + port);
});
