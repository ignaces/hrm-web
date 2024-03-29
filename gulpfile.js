var gulp = require('gulp');
var child = require('child_process');
var fs = require('fs');
var less = require('gulp-less'); 
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();
const shell = require('gulp-shell')
gulp.task('default', ['server', 'watch']);

gulp.task('server', shell.task([
    'adonis serve --dev',
  ]));

gulp.task('deployLess', function() {
    return gulp.src(
            [
                './public/themes/default/assets/less/components.less',
                './public/themes/default/assets/less/core.less',
                './public/themes/default/assets/less/icons.less',
                './public/themes/default/assets/less/menu_light_sm.less',
                './public/themes/default/assets/less/menu_light.less',
                './public/themes/default/assets/less/menu_sm.less',
                './public/themes/default/assets/less/menu.less',
                './public/themes/default/assets/less/pages.less',
                './public/themes/default/assets/less/responsive.less'
            ]
        )
    .pipe(less())
    .pipe(gulp.dest('./public/themes/default/assets/css/'));
});
gulp.task('deployLessH', function() {
    return gulp.src(
            [
                './public/themes/horizontal/assets/less/components.less',
                './public/themes/horizontal/assets/less/core.less',
                './public/themes/horizontal/assets/less/icons.less',
                './public/themes/horizontal/assets/less/menu_light_sm.less',
                './public/themes/horizontal/assets/less/menu_light.less',
                './public/themes/horizontal/assets/less/menu_sm.less',
                './public/themes/horizontal/assets/less/menu.less',
                './public/themes/horizontal/assets/less/pages.less',
                './public/themes/horizontal/assets/less/responsive.less'
            ]
        )
    .pipe(less())
    .pipe(gulp.dest('./public/themes/horizontal/assets/css/'));
});


gulp.task('watch', function(){
  gulp.watch('./public/themes/default/assets/less/*.less', ['deployLess']);
  gulp.watch('./public/themes/horizontal/assets/less/*.less', ['deployLessH']);
  gulp.watch('./client/src/*/*.js', ['webpack']);

});


gulp.task('webpack', function(){
    return gulp.src('./client/src/*/*.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./public/assets/js/dist/'));
});