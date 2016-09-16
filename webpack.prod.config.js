var webpack = require("webpack");
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CopyWebpackPlugin  = require('copy-webpack-plugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

//Set environment to production
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';

//Get host from environment variable. If not found, set to localhost
var HOST = process.env.HOST || 'localhost';

//Get port from environment variable. If not found, set to 8080
var PORT = process.env.PORT || 8080;

//Setup metadata (to be used by index.html)
var metadata = {
  title: 'Storykart',
  baseUrl: '/',
  host: HOST,
  port: PORT,
  ENV: ENV
};

module.exports = {
  entry: {
    "vendor": "./src/vendor",
    "main": "./src/main"
  },
  output: {
    path: __dirname,
    filename: "./build/[name].bundle.js",
    sourceMapFilename: './build/[name].map'
  },
  resolve: {
    //ToDo
    cache: false,
    // Webpack will process these file extensions
    extensions: ['','.ts','.js','.json','.css','.html']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      },
      // Handles JSON files.
      { test: /\.json$/,  loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/,   loader: 'raw-loader' },

      // Support for .html as raw text
      { test: /\.html$/,  loader: 'raw-loader'},
      
      // Compiles SCSS to CSS
      { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },

      // Handles imaage files. Uses data urls if file size is less than 10KB, else loads files using file loader
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000&name=[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* = */"./build/vendor.bundle.js"),
    // Makes a module available as variable in every module.
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    // Copy assets to dist folder
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'build/assets'
      }
    ]),
    // Setup Global Javascript Variables
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(metadata.ENV),
        'NODE_ENV': JSON.stringify(metadata.ENV)
      }
    }),
    //Uglify JS files
    new UglifyJsPlugin({
      // to debug prod builds uncomment //debug lines and comment //prod lines
      // beautify: true,//debug
      // mangle: false,//debug
      // dead_code: false,//debug
      // unused: false,//debug
      // deadCode: false,//debug
      // compress : { screw_ie8 : true, keep_fnames: true, drop_debugger: false, dead_code: false, unused: false, }, // debug
      // comments: true,//debug

      beautify: false,//prod
      // disable mangling because of a bug in angular2 beta.1, beta.2 and beta.3
      // TODO(mastertinner): enable mangling as soon as angular2 beta.4 is out
      // mangle: { screw_ie8 : true },//prod
      mangle: false,
      compress : { screw_ie8 : true, warnings: false},//prod
      comments: false//prod
    })
  ]
}
