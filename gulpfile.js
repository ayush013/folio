const { series, parallel, src, dest, task, watch } = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var addsrc = require('gulp-add-src');
var browserSync = require('browser-sync').create();

task('js', () => {
    return src(['node_modules/jquery/dist/jquery.min.js',
        './src/scripts/graphemescope.js',
        'node_modules/typed.js/lib/typed.js',
        './src/scripts/custom.js'])
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(rev())
        .pipe(dest('dist/js'))
});

task('css', () => {
    return src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(addsrc.append('styles/*.css'))
        .pipe(concat('style.css'))
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(dest('dist/css'))
});

task('assets', () => {
    return src(['./src/assets/**'])
        .pipe(dest('dist/assets'))
});

task('clean', () => {
    return src('dist')
        .pipe(clean());
});

task('inject', () => {
    return src('./src/index.html')
        .pipe(inject(src('dist/js/*'), {
            addRootSlash: false,
            ignorePath: '/dist',
            transform: function (file) {
                return '<script src="' + file + '" defer></script>';
            }
        }))
        .pipe(inject(src('dist/css/*'), {
            addRootSlash: false,
            ignorePath: '/dist',
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

task('default', series('clean', parallel('css', 'js', 'assets'), 'inject'));

task('watch', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    });
    watch("src/**", { ignoreInitial: false }, series('default'));
});
