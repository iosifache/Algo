/* Require modules */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

/* Browser sync */
gulp.task('browserSync', function(){
	browserSync.init({
		port: 3000,
		proxy: {
        	target: "localhost:3000",
        	ws: true
    	}
  	})
})

/* Watch */
gulp.task('watch', ['browserSync'], function (){
	gulp.watch('public/views/*.pug', browserSync.reload);
	gulp.watch('public/js/*.js', browserSync.reload);
});
