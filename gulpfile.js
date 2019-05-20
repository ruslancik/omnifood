'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const watch = require('gulp-watch');



///////
// TEST
///////
gulp.task('message', function(){
    return console.log(123);
});

///////////////////
// PREFİX task
///////////////////

gulp.task('prefix', () =>
    gulp.src('resources/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('resources/css/prefix'))
    );



    ///////////////////////
    /// Minify css
    //////////////////////
    gulp.task('minify-css', () => {
        return gulp.src('resources/css/prefix/*.css')
          .pipe(cleanCSS({compatibility: 'ie8'}))
          .pipe(gulp.dest('resources/css/minify'));
      });

// Watch

gulp.task('watch', function(){
  gulp.watch('resources/css/*.css', gulp.series('prefix'));
  gulp.watch('resources/css/*.css', gulp.series('minify-css'));

});



gulp.task('develop', gulp.series('prefix', 'minify-css', 'watch'));
