/* eslint-disable */

import rev from 'gulp-rev';
import revDel from 'gulp-rev-delete-original';
import revReplace from 'gulp-rev-replace';
import rename from 'gulp-rename';
import path from 'path';
import through from 'through2';
import chalk from "chalk";

import { DIST_DIRECTORY } from '../gulpfile.babel';

module.exports = function(cb) {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  if (!CONFIG.isProduction) {
    return cb();
  }

  const logVersion = () => through.obj((file, enc, cb) => {
    console.log(chalk.grey(path.relative(file.cwd, file.revOrigPath)), '=>', chalk.green(path.relative(file.cwd, file.path)));
    cb(null, file);
  });

  return gulp.src(`${CONFIG.paths.dist}/{assets,css,js}/**/*`)
    .pipe(rev())
    .pipe(revDel())
    .pipe(revReplace({
      replaceInExtensions: ['.css', '.js', '.xml', '.json'],
    }))
    .pipe(gulp.dest(CONFIG.paths.dist))
    .pipe(logVersion())
    .pipe(rename((p) => {
      p.dirname = `${DIST_DIRECTORY}/${p.dirname}`;
    }))
    .pipe(rev.manifest())
    .pipe(gulp.dest(CONFIG.paths.dist))
};
