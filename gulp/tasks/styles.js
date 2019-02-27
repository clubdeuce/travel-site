var gulp = require('gulp'),
postCss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
variables = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins');

gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postCss([cssImport,  mixins, variables, nested, autoprefixer]))
    .on('error', function(info){
      console.log(info.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});