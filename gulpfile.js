var gulp = require('gulp')
  , gutil = require('gulp-util')
  , concat = require('gulp-concat')
  , browserify = require('gulp-browserify')
  , stringify = require('stringify')
  , less = require('gulp-less')

gulp.task('javascripts', function() {
  gulp.src('src/javascripts/index.js')
    .pipe(browserify({
      transform: stringify(['.html'])
    })).on('error', gutil.log)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./assets/javascripts'))
})

gulp.task('stylesheets', function() {
  gulp.src('src/stylesheets/main.less')
    .pipe(less({ compress: true })).on('error', gutil.log)
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./assets/stylesheets'))
})

gulp.task('watch', function() {
  gulp.watch([
    'index.html',
    'src/**/stylesheets/*',
    'src/**/javascripts/*',
    'src/**/templates/*'
  ], ['javascripts', 'stylesheets'])
})

gulp.task('default', ['javascripts', 'stylesheets', 'watch'])
