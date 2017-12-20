import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import fs from 'fs';
import del from 'del';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browserSync from 'browser-sync';

import twigConfig from './twig.babel.js';

const $ = gulpLoadPlugins();
const config = JSON.parse(fs.readFileSync('./config.json'));

let isProduction = false;

/* Copy assets */
gulp.task('assets', () => {
  return gulp.src([config.sourcePath + '/assets/**/*'])
    .pipe($.cached('assets'))
    .pipe(gulp.dest(config.buildPath + '/assets'))
    .pipe(browserSync.stream());
});

/* Creating HTML views from TWIG files */
gulp.task('views', () => {
  return gulp.src([config.sourcePath + '/views/**/*.html.twig', '!' + config.sourcePath + '/views/**/_*.html.twig'])
    .pipe($.twig(twigConfig))
    .on('error', function (err) {
      console.error('Twig error:', err.message);
      browserSync.notify(err.message);
      this.emit('end');
    })
    .pipe($.rename({extname: ''})) // clear double file extension
    .pipe(gulp.dest(config.buildPath))
    .pipe(browserSync.stream());
});

/* JS with Babel and minification */
gulp.task('scripts', () => {
  return gulp.src([config.sourcePath + '/scripts/app.js'])
    .pipe(webpackStream({
      devtool: !isProduction ? 'source-map' : false,
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'stage-3']
          }
        }]
      },
      output: {
        filename: 'app.js',
      },
      plugins: isProduction ? [new webpack.optimize.UglifyJsPlugin()] : [],
    }, webpack))
    .on('error', function (err) {
      console.error('JS error:', err.message);
      browserSync.notify(err.message);
      this.emit('end');
    })
    .pipe(gulp.dest(config.buildPath + '/scripts'))
    .pipe(browserSync.stream());
});

/* CSS preprocessor */
gulp.task('styles', () => {
  return gulp.src(config.sourcePath + '/styles/styles.scss')
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.sass({
      includePaths: ['node_modules/']
    }))
    .on('error', function (err) {
      console.error('Sass error:', err.message);
      browserSync.notify(err.message);
      this.emit('end');
    })
    .pipe($.autoprefixer('last 2 versions', 'ie9'))
    .pipe($.if(isProduction, $.cleanCss()))
    .pipe($.if(!isProduction, $.sourcemaps.write('./', {
      addComment: true,
      includeContent: false,
      sourceRoot: '../../' + config.sourcePath + '/styles'
    })))
    .pipe(gulp.dest(config.buildPath + '/styles'))
    .pipe(browserSync.stream({match: '**/*.css'}))
});

/* Build paths cleaning */
gulp.task('clean', () => del.sync([config.buildPath]));

/* Build tasks  */
gulp.task('build', () => {
  isProduction = true;
  gulp.start('default');
});

const watcher = gulp => {
  gulp.watch(config.sourcePath + '/assets/**/*', ['assets']);
  gulp.watch(config.sourcePath + '/styles/**/*.scss', ['styles']);
  gulp.watch(config.sourcePath + '/scripts/**/*', ['scripts']);
  gulp.watch([config.sourcePath + '/views/**/*.html.twig', config.sourcePath + '/assets/**/*.svg'], ['views']);
};

/* Build project & watch for source files changes */
gulp.task('watch', ['default'], () => {
  watcher(gulp);
});

/* Build project, serve + live reload on changes */
gulp.task('serve', ['default'], () => {
  watcher(gulp);
  browserSync.init({server: config.buildPath});
});

/* Default task - build */
gulp.task('default', ['clean'], (cb) => {
  console.info('Environment:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');
  runSequence(['assets', 'views', 'styles', 'scripts'], cb);
});
