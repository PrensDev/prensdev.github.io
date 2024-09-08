const { src, dest, watch, series } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const fileinclude = require('gulp-file-include');


// For compiling html files

const HTML_SOURCE_PATH = './src/pages/';

const compileHTMLTask = () => {
  return src([HTML_SOURCE_PATH + 'index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        dev: 'PrensDev'
      }
    }))
    .pipe(dest('./'))
}

const watchHTMLTask = () => {
  watch(HTML_SOURCE_PATH + '**/*.html', series(compileHTMLTask))
}

exports.build_html = series(compileHTMLTask);
exports.watch_html = series(compileHTMLTask, watchHTMLTask);


// For compiling javascript files

const JS_SOURCE_PATH = './src/js/';
const JS_PUBLIC_PATH = './public/js/';


const cleanJSTask = () => {
  return src(JS_PUBLIC_PATH + '*.js', { read: false })
    .pipe(clean({ force: true }))
}

const compileJSTask = () => {
  return src([
    JS_SOURCE_PATH + 'index.js',
  ])
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(concat('portfolio.js'))
    .pipe(sourcemaps.write('./jsmaps'))
    .pipe(dest(JS_PUBLIC_PATH))
}

const watchJSTask = () => {
  watch(JS_SOURCE_PATH + '**/*.js', series(compileJSTask))
}

exports.build_js = series(cleanJSTask, compileJSTask);
exports.watch_js = series(cleanJSTask, compileJSTask, watchJSTask)