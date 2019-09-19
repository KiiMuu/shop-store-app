var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');

gulp.task('express', function() {  
    require('./app');
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.scss', gulp.series('sass'));
});

// sass task

gulp.task('sass', function () {
    return gulp.src('src/scss/index.scss', {
        sourcemap: true,
        style: 'compressed'
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/css'))
    .pipe(connect.reload());
});

// default task

gulp.task('default', gulp.parallel('watch', 'express'));