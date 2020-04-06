const { series, parallel, src, dest, task } = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var addsrc = require('gulp-add-src');

task('js', () => {
    return src(['./scripts/*.js'])
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
    return src('./styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(addsrc.append('styles/*.css'))
        .pipe(concat('style.css'))
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(dest('dist/css'))
});

task('clean', () => {
    return src('dist')
        .pipe(clean());
});

task('inject', () => {
    return src('index.html')
        .pipe(inject(src('dist/js/*'), {
            addRootSlash: false,
            transform: function (file) {
                return '<script src="' + file + '" defer></script>';
            }
        }))
        .pipe(inject(src('dist/css/*'), {
            addRootSlash: false,
        }))
        .pipe(dest('dist'));
});

exports.build = series('clean', parallel('css', 'js'), 'inject');