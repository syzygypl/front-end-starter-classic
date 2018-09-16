/* eslint-disable */

module.exports = function (done) {
  const gulp = this.gulp;

  return gulp.series('clean', gulp.parallel('views', 'styles', 'scripts', 'assets'))(done)
};
