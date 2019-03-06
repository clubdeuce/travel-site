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
      baseDir: 'docs'
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], () => {
  return del('./docs');
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
    .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], () => {
  return gulp.src([
    './app/assets/images/**/*',
    '!./app/assets/images/icons',
    '!./app/assets/images/icons/**/*'
  ]).pipe(imageMin({
    progressive: true,
    intterlaced: true,
    multipass: true
  })).pipe(gulp.dest('./docs/assets/images/'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], () => {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () => {
  return gulp.src('./app/index.html')
    .pipe(useMin({
      css: [() => { return revision(); }, () => { return cssNano(); }],
      js: [() => { return revision() }, () => { return uglify() }]
    }))
    .pipe(gulp.dest('./docs/'));
});

gulp.task('build', [
  'deleteDistFolder',
  'copyGeneralFiles',
  'optimizeImages',
  'useminTrigger'
]);