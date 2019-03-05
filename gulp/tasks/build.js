var gulp = require('gulp'),
imageMin = require( 'gulp-imagemin'),
del = require('del'),
useMin = require('gulp-usemin'),
revision = require('gulp-rev'),
cssNano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browswerSync = require('browser-sync').create();

gulp.task('previewDist', () => {
  browswerSync.init({
    notify: false,
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('deleteDistFolder', () => {
  return del('./dist');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
  let pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], () => {
  return gulp.src([
    './app/assets/images/**/*',
    '!./app/assets/images/icons',
    '!./app/assets/images/icons/**/*'
  ]).pipe(imageMin({
    progressive: true,
    intterlaced: true,
    multipass: true
  })).pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], () => {
  return gulp.src('./app/index.html')
    .pipe(useMin({
      css: [() => { return revision(); }, () => { return cssNano(); }],
      js: [() => { return revision() }, () => { return uglify() }]
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', [
  'deleteDistFolder',
  'copyGeneralFiles',
  'optimizeImages',
  'usemin'
]);