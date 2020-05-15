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
const htmlmin = require('gulp-htmlmin');
const purgecss = require('gulp-purgecss');

task('js', () => {
    return src(['node_modules/jquery/dist/jquery.min.js',
        'node_modules/typed.js/lib/typed.js',
        'node_modules/splitting/dist/splitting.min.js',
        'node_modules/scroll-out/dist/scroll-out.min.js',
        'node_modules/universal-tilt.js/lib/universal-tilt.min.js',
        'node_modules/rellax/rellax.min.js',
        'node_modules/gsap/dist/gsap.min.js',
        'node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js',
        'node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js',
        'node_modules/vanilla-lazyload/dist/lazyload.min.js',
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
        './src/scripts/custom.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        }))
        .pipe(rev())
        .pipe(dest('dist/js'));
});

task('css', () => {
    return src(['./src/styles/**/*.scss'])
        .pipe(sass())
        .pipe(purgecss({
            content: ['**/*.html', 'scripts/*.js']
        }))
        .pipe(addsrc.append('node_modules/owl.carousel/dist/assets/owl.carousel.min.css'))
        .pipe(concat('style.css'))
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(dest('dist/css'));
});

task('assets', () => {
    return src(['./src/assets/**'])
        .pipe(dest('dist/assets'));
});

task('clean', () => {
    return src('dist', { allowEmpty: true })
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
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

task('default', series('clean', parallel('css', 'js', 'assets'), 'inject'));

task('serve', () => {
    watch("src/**", { ignoreInitial: false }, series('default'));
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        files: "./dist/**/*",
        open: false,
        notify: false,
        ghostMode: false
    });
});
