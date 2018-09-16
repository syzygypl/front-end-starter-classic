/* eslint-disable */

import postcss from "gulp-postcss";
import stylelint from "stylelint";
import reporter from "postcss-reporter";
import syntaxSCSS from "postcss-scss";

module.exports = function (done) {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  return gulp.src([CONFIG.paths.src + "/styles/**/*.scss"])
    .pipe(postcss([
      stylelint(),
      reporter({
        clearReportedMessages: true,
      })
    ], {
      syntax: syntaxSCSS,
    }))
    .on('error', function (err) {
      console.error('Stylelint error:', err.message);
      done();
    })
};
