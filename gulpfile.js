var { src, dest, series, parallel, watch} = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

function clean() {
  return del("./dist");
}

function test() {
  return src("./src/*.html").pipe(dest("./dist/"));
}

function js() {
  return src("./src/*.js").pipe(dest("./dist/"));
}

function sassf() {
  return src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(dest('./dist/css'));
}

function watchFiles() {
  watch("./src/*.html", test);
  watch("./src/*.js", js);
  watch("./src/scss/**/*.scss", sassf);
}



exports.clean = series(clean);
exports.bulid = series(clean, test, sassf, js);
exports.default = parallel( watchFiles, series(test, sassf, js));

