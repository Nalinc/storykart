var webpack = require("webpack");
module.exports = {
  entry: {
    "vendor": "./src/app/vendor",
    "app/main": "./src/app/boot"
  },
  output: {
    path: __dirname,
    filename: "./build/[name].bundle.js",
    sourceMapFilename: './build/[name].map'
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
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* = */"./build/vendor.bundle.js")
  ]
}