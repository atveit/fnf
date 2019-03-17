const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const jasmineBrowser = require('gulp-jasmine-browser');

gulp.task('default', ['styles'], function() {
    gulp.watch('sass/**/*.scss', ['styles']);

    browserSync.init({
        server: './'
    });
});

gulp.task('styles', function() {
    gulp
	.src('sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions']
            })
        )
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('tests', function() {
    return gulp
        .src('tests/spec/extraSpec.js')
        .pipe(jasmineBrowser.specRunner({ console: true }))
        .pipe(jasmineBrowser.headless({ driver: 'chrome' }));
});
