const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

/* Sass Task */
function scssTask() {
  return src('./scss/main.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([autoprefixer , cssnano()]))
  .pipe(dest('./dist/css', {sourcemaps: '.'}))
}

/* Watch Task */
function watchTask() {
  watch(['./scss/**/*.scss', '*.html'], scssTask);
}

exports.default = series(
  scssTask,
  watchTask
);