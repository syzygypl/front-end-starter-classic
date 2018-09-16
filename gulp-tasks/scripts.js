/* eslint-disable */

import webpack from "webpack";
import webpackStream from "webpack-stream";

module.exports = function () {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  return gulp.src([CONFIG.paths.src + "/scripts/*.js"])
    .pipe(webpackStream({
      config : require(CONFIG.paths.config + '/webpack.config.js')
    }, webpack))
    .on('error', function (err) {
      console.error('JS error:', err.message);
      this.emit('end');
    })
    .pipe(gulp.dest(CONFIG.paths.dist + "/js"))
};
