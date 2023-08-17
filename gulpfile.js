const { src, dest, watch, series } = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

/* Sass Task */
function scssTask() {
  return src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer, cssnano()]))
    .pipe(dest('./dist/css', { sourcemaps: '.' }))
}

/* Browsersync Task */
function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    open: false,
  });
  cb();
}

/* Browsersync reload when files saved */
function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

/* Watch Task */
function watchTask() {
  watch(['./scss/**/*.scss', '*.html'], series(scssTask, browsersyncReload));
}

exports.default = series(
  scssTask,
  browsersyncServe,
  watchTask
);