/* eslint-disable */

module.exports = function () {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  gulp.watch(CONFIG.paths.src + "/styles/**/*.scss", gulp.series('lint:styles', 'styles'));
  gulp.watch(CONFIG.paths.src + "/scripts/**/*.js", gulp.series('lint:scripts', 'scripts'));
  gulp.watch(CONFIG.paths.src + "/assets/**/*", gulp.series('assets'));
  gulp.watch([CONFIG.paths.src + '/views/**/*.html.twig', CONFIG.paths.src + '/assets/**/*.svg'], gulp.series('views'));
};
