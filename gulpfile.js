var gulp = require('gulp')
  , concat = require('gulp-concat')
  , browserify = require('gulp-browserify')
  , less = require('gulp-less')
  , templates = require('./src/javascripts/gulp-templates')

gulp.task('javascripts', function() {
  gulp.src('src/templates/**')
    .pipe(templates('templates.js'))
    .pipe(gulp.dest('./src/javascripts'))

  gulp.src('src/javascripts/index.js')
    .pipe(browserify())
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./assets/javascripts'))
})

gulp.task('stylesheets', function() {
  gulp.src('src/stylesheets/main.less')
    .pipe(less({ compress: true }))
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./assets/stylesheets'))
})

gulp.task('watch', function() {
  gulp.watch([
    'index.html',
    'src/**/stylesheets/*',
    'src/**/javascripts/*',
    '!src/javascripts/templates.js',
    'src/**/templates/*'
  ], ['javascripts', 'stylesheets'])
})

gulp.task('default', ['javascripts', 'stylesheets', 'watch'])
