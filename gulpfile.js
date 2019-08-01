'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

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

//Clean
gulp.task('clean', function(){
    return del(['dist']);
});

gulp.task('copyfonts', function(){
    gulp.src('./node_modules/font-awesome/fonts/**/*.{tff,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

//Images
gulp.task('imagemin', function(){
    return gulp.src('img/*.{png, jpg, gif}')
    .pipe(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function() {
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
          .pipe(usemin({
              css: [ rev() ],
              html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
              js: [ uglify(), rev() ],
              inlinejs: [ uglify() ],
              inlinecss: [ cleanCss(), 'concat' ]
          }))
      }))
      .pipe(gulp.dest('dist/'));
  });  

gulp.task('build', ['clean'], function(){
    gulp.start('copyfonts', 'imagemin', 'usemin');
});