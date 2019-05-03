var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    uglify = require('gulp-uglify');

var sccsPath = './scss/**/*.scss';
var baseName = 'ESFA';
var outputPath = 'wwwroot/' + baseName;
var assetsPath = '"./assets/';

function buildCss() { 
    return gulp.src([sccsPath])
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: 'node_modules'
        }))
        .pipe(replace('"/assets/', assetsPath))
        .pipe(postcss([autoprefixer({
            browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']
        })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath))
        .pipe(cleanCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(outputPath));
}

function copyAllJs() {
    return gulp.src(['./node_modules/govuk-frontend/all.js'])
        .pipe(rename({ basename: baseName }))
        .pipe(gulp.dest(outputPath))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(outputPath));
}

function copyAssets() {
    return gulp.src(['./node_modules/govuk-frontend/assets/**/*'])
        .pipe(gulp.dest(outputPath + '/assets/'));
}

function watcher() {
    gulp.watch([sccsPath], gulp.series(buildCss));
}

exports.watch = gulp.series(buildCss, watcher);
exports.default = gulp.series(buildCss, copyAllJs, copyAssets);
exports.buildCss = gulp.series(buildCss);
exports.copyAllJs = gulp.series(copyAllJs);
exports.copyAssets = gulp.series(copyAssets);
