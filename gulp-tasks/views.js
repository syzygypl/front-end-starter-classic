/* eslint-disable */

import twig from "gulp-twig";
import rename from "gulp-rename";
import twigConfig from "../twig.babel";

module.exports = function () {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  return gulp.src([CONFIG.paths.src + "/views/**/*.html.twig", "!" + CONFIG.paths.src + "/views/**/_*.html.twig"])
    .pipe(twig(twigConfig))
    .on('error', function (err) {
      console.error('Twig error:', err.message);
      browserSync.notify(err.message);
      this.emit('end');
    })
    .pipe(rename({ extname: '' })) // clear double file extension
    .pipe(gulp.dest(CONFIG.paths.dist))
};
