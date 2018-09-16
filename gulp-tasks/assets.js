/* eslint-disable */

module.exports = function () {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  return gulp.src([CONFIG.paths.src + "/assets/**/*"])
    .pipe(gulp.dest(CONFIG.paths.dist + "/assets"))
};
