var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	compass = require('gulp-compass'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	refresh = require('gulp-livereload'),
	livereload = require('connect-livereload'),
	lrserver = require('tiny-lr')(),
	express = require('express'),
	app = require('./app');



app.use(livereload({
	port: 5000
}));
app.use(express.static('./public'))

gulp.task('compass', function() {
	gulp.src('./scss/styles.scss')
		.pipe(compass({
			css: './css',
			sass: './scss',
		}).on('error', function(error) {
			console.log(error);
		}))
		.pipe(gulp.dest('./public/css'))
		.pipe(refresh(lrserver));
});

gulp.task('coffeescript', function() {
	gulp.src('./coffeescript/start.coffee', {read: false})
		.pipe(browserify({
			transform: ['coffeeify'],
			extensions: ['.coffee'],
			basedir: './coffeescript'
		}).on('error', function(error) {
			console.log(error);	
		}))
		.pipe(concat('start.js'))
		.pipe(gulp.dest('./public/js/'))
		.pipe(refresh(lrserver));
});

gulp.task('serve', function() {
	app.listen(5000);
	lrserver.listen(35729);
});

gulp.task('reload', function() {
	gulp.src('./app.js', {read: false})
		.on('error', function(error) {
			console.log(error)
		})
		.pipe(refresh(lrserver))
		.on('error', function(error) {
			console.log(error)
		});
})



gulp.task('default', ['compass', 'coffeescript', 'serve']);

gulp.watch('./app.js', ['reload']);

gulp.watch('./scss/**/*.scss', ['compass']);

gulp.watch('./coffeescript/**/*.coffee', ['coffeescript']);