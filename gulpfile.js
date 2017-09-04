var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

var postcss = require('gulp-postcss');
var csswring = require('csswring');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
//var atImport = require('postcss-import'); include processor atImport


gulp.task('postcss', function(){
    var processors = [
        csswring,
        autoprefixer({
            browsers: 'last 2 version'
        }),
        cssnano,
    ];
    
    return gulp.src('public/styles/scss/**/*.scss')
        .pipe(concat('all.scss'))
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('public/styles'))
});

gulp.task('compress', function() {
  gulp.src(['app/js/animations.js', 'app/js/anime.min.js', 'app/js/functions.js'])
    .pipe(concat('all.js'))
    .pipe(minify({
        ext:{
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('app/dist'))
});

gulp.task('watch', function(){
    gulp.watch('public/styles/scss/**/*.scss', ['postcss']);
    //gulp.watch('app/js/**/*.js', ['compress']);
});