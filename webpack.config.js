var webpack = require("webpack");
module.exports = {
  entry: {
    "app/vendor": "./src/app/vendor",
    "app/app": "./src/app/boot"
  },
  output: {
    path: __dirname + '/build',
    filename: "[name].bundle.js",
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.ts/,
        loaders: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"app/vendor", /* = */"./vendor.bundle.js")
  ]
}