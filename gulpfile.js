var gulp = require('gulp');
var child = require('child_process');
var fs = require('fs');
var less = require('gulp-less'); 
var webpack = require('webpack-stream');


gulp.task('default', ['server', 'watch']);

gulp.task('server', function() {
  var server = child.spawn('node', ['server.js']);
  var log = fs.createWriteStream('server.log', {flags: 'a'});
  server.stdout.pipe(log);
  server.stderr.pipe(log);
});
gulp.task('deployLess', function() {
    return gulp.src(
            [
                './public/assets/less/components.less',
                './public/assets/less/core.less',
                './public/assets/less/icons.less',
                './public/assets/less/menu_light_sm.less',
                './public/assets/less/menu_light.less',
                './public/assets/less/menu_sm.less',
                './public/assets/less/menu.less',
                './public/assets/less/pages.less',
                './public/assets/less/responsive.less'
            ]
        )
    .pipe(less())
    .pipe(gulp.dest('./public/assets/styles/'));
});
gulp.task('watch', function(){
  gulp.watch('./public/assets/less/*.less', ['deployLess']);
  gulp.watch('./client/src/*/*.js', ['webpack']);

});


gulp.task('webpack', function(){
    return gulp.src('./client/src/*/*.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./public/assets/js/dist/'));
});