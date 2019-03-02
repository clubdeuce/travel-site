var gulp = require('gulp'),
gulpWatch = require('gulp-watch'),
browswerSync = require('browser-sync').create();

gulp.task('watch', function(){
  browswerSync.init({
    notify: false,
    server: {
      baseDir: 'app'
    }
  });
  gulpWatch('./app/index.html', function(){
    browswerSync.reload();
  });

  gulpWatch('./app/assets/styles/**/*.css', function(){
    gulp.start('cssInject');
  });

  gulpWatch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });
});

gulp.task('cssInject', ['styles'], function(){
  return gulp.src('./app/temp/styles/styles.css').
    pipe(browswerSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browswerSync.reload();
});