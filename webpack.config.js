/* eslint-disable */

import CONFIG from "./gulpfile.babel";

module.exports = {
  entry: CONFIG.paths.src + "/scripts/main.js",
  mode: CONFIG.isProduction ? 'production' : 'development',
  devtool: !CONFIG.isProduction ? 'source-map' : false,
  resolve: {
    modules: [CONFIG.paths.node_modules],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
  },
};
