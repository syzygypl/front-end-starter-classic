/* eslint-disable */

import eslint from "gulp-eslint";

module.exports = function () {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  return gulp.src([CONFIG.paths.src + "/scripts/**/*.js"])
    .pipe(eslint({
      configFile: CONFIG.paths.config + "/.eslintrc",
    }))
    .pipe(eslint.format());
};
