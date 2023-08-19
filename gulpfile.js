import gulp from 'gulp';
const { src, dest, watch, series } = gulp;
import gulpSass from "gulp-sass";
import * as sassEmbeded from "sass";
const sass = gulpSass(sassEmbeded);
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from 'gulp-postcss';
import sourcemaps from "gulp-sourcemaps";
const { init, write } = sourcemaps;
import browsersync from "browser-sync";
const browserSync = browsersync.create();
import terser from "gulp-terser";
import concat from "gulp-concat";

/* Sass Task */
function scssTask() {
  return src('./scss/style.scss')
    .pipe(init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(concat('style.css'))
    .pipe(write('.'))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream())
}

/* Js Task */
function jsTask() {
  return src('app/js/*.js')
    .pipe(init())
    .pipe(terser())
    .pipe(concat('main.js'))
    .pipe(write('.'))
    .pipe(dest('dist/js'));
}

/* Browsersync Task */
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    open: false
  });
  cb();
}

/* Browsersync reload when files saved */
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

/* Watch Task */
function watchTask() {
  watch(['./scss/**/*.scss', './dist/js/**/*.js', './dist/*.html'], series(scssTask, jsTask, browserSyncReload));
}

const _default = series(
  scssTask,
  browserSyncServe,
  watchTask
);

export default _default;