'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
  
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    // 'src/globals/scss/govuk-frontend.scss'
    .pipe(sass({includePaths: 'node_modules/'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});
