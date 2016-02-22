'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');

 
gulp.task('sass', function () {
  return gulp.src('./public/assets/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./public/assets/sass/*.sass', ['sass']);
});

// task for linting js files
gulp.task('js', function() {
return gulp.src(['server.js', 'public/app/*.js', 'public/app/**/*.js']) .pipe(jshint())
.pipe(jshint.reporter('default'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('public/assets/images/*.png').pipe(spritesmith({
    imgName: 'stats_sprites.png',
    cssName: 'stats_sprites.css'
  }));
  
  return spriteData.pipe(gulp.dest('public/assets/sprites/'));
});

gulp.task('build',['sass','sprite'], function(){
    
});