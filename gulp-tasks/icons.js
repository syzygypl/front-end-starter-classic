/* eslint-disable */

import svgstore from "gulp-svgstore";
import rename from "gulp-rename";

module.exports = function () {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  return gulp.src([CONFIG.paths.src + '/icons/*.svg'])
    .pipe(rename({
      prefix: 'icon-',
    }))
    .pipe(svgstore({
      inlineSvg: true,
    }))
    .on('error', function (err) {
      console.error('SVG Store error:', err.message);
      this.emit('end');
    })
    .pipe(gulp.dest(CONFIG.paths.dist + "/assets"))
};
