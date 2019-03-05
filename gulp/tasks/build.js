var gulp = require('gulp'),
imageMin = require( 'gulp-imagemin'),
del = require('del'),
useMin = require('gulp-usemin');

gulp.task('deleteDistFolder', () => {
  return del('./dist');
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
  })).pipe(gulp.dest('./dist/assets/images/'));
});

gulp.task('usemin', ['deleteDistFolder'], () => {
  return gulp.src('./app/index.html')
    .pipe(useMin({
      //html: [htmlMin({collapseWhitespace: true})],
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', [
  'deleteDistFolder',
  'optimizeImages',
  'usemin'
]);