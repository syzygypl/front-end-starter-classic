/* eslint-disable */

import gulp from "gulp";
import gulpLoadAllTasks from "gulp-load-all-tasks";
import chalk from "chalk";
import path from "path";
import { argv } from "yargs";

const ENV = process.env.NODE_ENV || (argv.production && 'production') || 'development';

// CONFIG - START //

export const SRC_RELATIVE_PATH = "src/";
export const TEMPLATES_RELATIVE_PATH = "src/views/";
export const DIST_DIRECTORY = ""; // e.g. "frontend"
export const DIST_RELATIVE_PATH = "web/" + (DIST_DIRECTORY ? `${DIST_DIRECTORY}/` : '');

// CONFIG - END //

const CONFIG = {
  paths: {
    src: path.resolve(__dirname, `./${SRC_RELATIVE_PATH}`),
    templates: path.resolve(__dirname, `./${TEMPLATES_RELATIVE_PATH}`),
    dist: path.resolve(__dirname, argv.dist || `./${DIST_RELATIVE_PATH}`),
    config: path.resolve(__dirname, "./"),
    node_modules: path.resolve(__dirname, "./node_modules/"),
  },
  env: ENV,
  isProduction: ENV === 'production',
};

console.log(chalk.green('ENV:', CONFIG.env));

gulpLoadAllTasks({
  CONFIG,
});

gulp.task('default',
  gulp.series('build'),
);

export default CONFIG;
