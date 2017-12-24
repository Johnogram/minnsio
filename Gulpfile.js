var gulp         = require('gulp');
var less         = require('gulp-less');
var cleanCSS     = require('gulp-clean-css');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var watch        = require('gulp-watch');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var uglify       = require('gulp-uglify');
var rucksack     = require('gulp-rucksack');
var babel        = require('gulp-babel');

var JS_FILES = [
    'node_modules/js-cookie/src/js.cookie.js',
    'node_modules/jquery-validation/dist/jquery.validate.js',
    'node_modules/jquery-placeholder/jquery.placeholder.js',
    'assets/js/src/**/*.js',
    'node_modules/remodal/src/remodal.js',
    'assets/js/src/script.js'
];

// Any JS not written by us place in third-party folder for Babel to ignore
var BABEL_IGNORE = [
  'node_modules/**/*.js',
  'node_modules/**/**/*.js',
  'assets/js/src/third-party/*.js'
];

gulp.task('less-dev',function(){
    gulp.src('assets/less/style.less')
        .pipe(sourcemaps.init())
           .pipe(less())
           .pipe(rucksack())
           .pipe(autoprefixer())
        .pipe(sourcemaps.write('./assets/maps'))
        .pipe(gulp.dest('./'));
});

gulp.task('less-build',function(){
    gulp.src('assets/less/style.less')
        .pipe(less())
        .pipe(rucksack())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(gulp.dest('./'));

});

gulp.task('scripts-dev', function() {
    return gulp.src(JS_FILES)
        .pipe(babel({
          presets: ['env'],
          ignore: BABEL_IGNORE
        }))
        .pipe(sourcemaps.init())
            .pipe(concat('main.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('scripts-build', function() {
    return gulp.src(JS_FILES)
        .pipe(babel({
          presets: ['env'],
          ignore: BABEL_IGNORE
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('dev', ['less-dev', 'scripts-dev'], function(){
    gulp.watch('assets/less/**/*.less',['less-dev']);
    gulp.watch('assets/js/src/**/*.js',['scripts-dev']);
});

gulp.task('build', ['less-build', 'scripts-build']);

gulp.task('default', ['less-dev']);
