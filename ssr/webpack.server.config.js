const { join } = require('path');
const { ContextReplacementPlugin } = require('webpack');
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    server: join(__dirname, 'server.ts'),
    start: join(__dirname, 'start.ts'),
  },

  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: join(__dirname, '..', 'dist', 'server'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    new copyWebpackPlugin([
      {from: "dist/browser/**/*"},
      {from: "dist/server/**/*"},
    ]),

    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for 'WARNING Critical dependency: the request of a dependency is an expression'
    new ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      join(__dirname, '..', 'src'), // location of your src
      {} // a map of your routes
    ),
    new ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      join(__dirname, '..', 'src'),
      {}
    )
  ]
};
