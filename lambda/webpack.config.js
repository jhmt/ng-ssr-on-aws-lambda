const path = require('path');
const webpack = require('webpack');
const copyWebpackPlugin = require("copy-webpack-plugin");

const slsw = require('serverless-webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  // Make sure we include all node_modules etc
  externals: [/(node_modules|main\..*\.js)/,],
  output: {
    libraryTarget: "commonjs",
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist', 'lambda'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new copyWebpackPlugin([
      {from: "dist/browser/**/*"},
      {from: "dist/server/**/*"},
    ]),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
}
