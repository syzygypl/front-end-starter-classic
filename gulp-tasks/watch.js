/* eslint-disable */

module.exports = function () {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  const tasksStyles = gulp.series('lint:styles', 'styles');
  const tasksScripts = gulp.series('lint:scripts', 'scripts');

  gulp.watch(CONFIG.paths.src + "/styles/**/*.scss", tasksStyles);
  gulp.watch(CONFIG.paths.src + "/scripts/**/*.js", tasksScripts);
  gulp.watch(CONFIG.paths.src + "/settings.json", gulp.parallel(tasksStyles, tasksScripts));
  gulp.watch(CONFIG.paths.src + "/assets/**/*", gulp.series('assets'));
  gulp.watch(CONFIG.paths.src + "/icons/*.svg", gulp.series('icons'));
  gulp.watch([CONFIG.paths.src + "/views/**/*.html.twig", CONFIG.paths.src + "/assets/**/*.svg"], gulp.series('views'));
};
