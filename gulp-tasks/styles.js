/* eslint-disable */

import gulpIf from "gulp-if";
import sass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import postcss from "gulp-postcss";
import cleancss from "gulp-clean-css";

import autoprefixer from "autoprefixer";

module.exports = function () {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  return gulp.src(CONFIG.paths.src + "/styles/*.scss")
    .pipe(gulpIf(!CONFIG.isProduction, sourcemaps.init()))
    .pipe(sass({
      includePaths: [CONFIG.paths.node_modules],
    }))
    .on('error', function (err) {
      console.error('Sass error:', err.message);
      this.emit('end');
    })
    .pipe(postcss([
      autoprefixer({
        map: true,
        browsers: ['last 2 versions', 'ie >= 11'],
      }),
    ]))
    .pipe(gulpIf(CONFIG.isProduction, cleancss()))
    .pipe(gulpIf(!CONFIG.isProduction, sourcemaps.write('./', {
      addComment: true,
      includeContent: true,
      sourceRoot: CONFIG.paths.src + "/styles",
    })))
    .pipe(gulp.dest(CONFIG.paths.dist + "/css"))
};
