var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	stripCssComments = require('gulp-strip-css-comments');

var scss = ['./sass/**/*.scss'],
	css  = ['./dist/css/bootstrap.css',
            './dist/css/main.css'],
	js	 = ['./js/angular.min.js',
            './js/angular-route.min.js',
            './js/app.js',
            './js/controller.js'];

gulp.task('scss', function() {
    gulp.src(scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('styles', function(){
    gulp.src(css)
    .pipe(concat('styles.min.css'))
    .pipe(stripCssComments({all: true}))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function() {
  gulp.src(js)
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('default',function() {
    gulp.watch(scss, ['scss']);
    gulp.watch(css, ['styles']);
    gulp.watch(js, ['scripts']);
});