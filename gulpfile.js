'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync');

gulp.task('less', function(){
    return gulp.src('./css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./css'));
});

gulp.task('less:watch', function(){
    gulp.watch('./css/*.less', ['less']);
});

gulp.task('browser-sync', function(){
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,gif,jpg}'
    ];

    browserSync.init(files, {
        server:{
            baseDir:"./"
        }
    });
});

gulp.task('default', ['browser-sync'], function(){
    gulp.start('less:watch');
});