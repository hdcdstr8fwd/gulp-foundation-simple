var gulp = require('gulp');

var cleanCSS= require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var serve = require('browser-sync');
var watch = require('gulp-watch');

//Minify any CSS and place in app/css
gulp.task('minify-css', function() {
	return gulp.src([
		'bower_components/foundation-sites/dist/foundation.css', 
		'src/css/*.css'
	])
	.pipe(concat('main.css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(cleanCSS())
    .pipe(gulp.dest('app/css/'));
});

//Minify + Concat any Vendor JS and our own JS files.
gulp.task('scripts', function() {
	return gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/foundation-sites/dist/foundation.js',
		'bower_components/what-input/what-input.js'	
	])
	.pipe(concat('main.js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

//Define Server Task.
gulp.task('serve',  function() {
    serve.init({
        server: {
            baseDir: "app/"
        }
    });
	gulp.watch("app/*.html").on('change', serve.reload);
});

gulp.task('default', ['minify-css', 'scripts']);
