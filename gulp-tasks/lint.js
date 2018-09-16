/* eslint-disable */

module.exports = function (done) {
  const gulp = this.gulp;

  return gulp.series('lint:styles', 'lint:scripts')(done);
};
