import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();

import twigConfig from './twig.babel.js';

/* Copy assets */
gulp.task('assets', () => {
  gulp.src(['src/assets/**/*'])
    .pipe($.cached('assets'))
    .pipe(gulp.dest('web/assets'))
    .pipe(browserSync.stream());
});

/* Creating HTML views from TWIG files */
gulp.task('views', () => {
    gulp.src(['src/views/**/*.html.twig', '!src/views/**/_*.html.twig'])
        .pipe($.twig(twigConfig))
        .on('error', (err) => {
            console.log('Twig error:', err.message);
            browserSync.notify(err.message);
            this.emit('end');
        })
        .pipe($.rename({ extname: '' })) // clear double file extension
        .pipe(gulp.dest('web'))
        .pipe(browserSync.stream());
});

/* JS with Babel and minification */
gulp.task('scripts', () => {
    gulp.src(['src/scripts/app.js'])
        .pipe(webpackStream({
            devtool: 'source-map',
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
            plugins: [new webpack.optimize.UglifyJsPlugin({ sourceMap: true })],
        }, webpack))
        .on('error', (err) => {
            console.log('JS error:', err.message);
            browserSync.notify(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest('web/scripts'))
        .pipe(browserSync.stream());
});

/* CSS preprocessor */
gulp.task('styles', () => {
    gulp.src('src/styles/styles.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: ['node_modules/']
        }))
        .on('error', (err) => {
            console.log('Sass error:', err.message);
            browserSync.notify(err.message);
            this.emit('end');
        })
        .pipe($.autoprefixer('last 2 versions', 'ie9'))
        .pipe($.cleanCss())
        .pipe($.sourcemaps.write('./', {
            addComment: true,
            includeContent: false,
            sourceRoot: '../../src/styles'
        }))
        .pipe(gulp.dest('web/styles'))
        .pipe(browserSync.stream({ match: '**/*.css' }))
});

/* Build paths cleaning */
gulp.task('clean', () => {
    return del.sync(['web'])
});

/* Build tasks  */
gulp.task('build', ['clean'], () => {
    gulp.start(['assets', 'views', 'styles', 'scripts']);
});

var watcher = (gulp) => {
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/scripts/**/*', ['scripts']);
    gulp.watch(['src/views/**/*.html.twig', 'src/**/*.svg'], ['views']).on('change', browserSync.reload);
};

/* Build project & watch for source files changes */
gulp.task('watch', ['build'], () => {
    watcher(gulp);
});

/* Build project, serve + live reload on changes */
gulp.task('serve', ['build'], () => {
    watcher(gulp);
    browserSync.init({ server: 'web' });
});

/* Default task - build */
gulp.task('default', ['build']);
