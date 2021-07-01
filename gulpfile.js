const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const rename = require("gulp-rename")
const del = require('del')
const server = require('browser-sync').create()


function styles() {
    return gulp.src('app/scss/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
}

function serve(cb) {
    server.init({
        server: "./app"
    });
    gulp.watch('app/scss/**/*.scss', gulp.series(styles, cb => gulp.src('app/css').pipe(server.stream()).on('end', cb)))
    gulp.watch("app/index.html").on('change', server.reload);
    return cb()
}


module.exports.start = gulp.series(styles, serve)