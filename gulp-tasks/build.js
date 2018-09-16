/* eslint-disable */

module.exports = function (done) {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  const buildTasks = gulp.series('clean', gulp.parallel('styles', 'scripts', 'assets', 'icons'), 'revs', 'views');

  return CONFIG.isProduction ? gulp.series(buildTasks)(done) : gulp.series('lint', buildTasks)(done);
};
