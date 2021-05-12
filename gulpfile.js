const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require('gulp-clean-css');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const purgecss = require('gulp-purgecss')


// gulp.task('serve',['build'], function() {

//     browserSync.init({
//         server: "./"
//     });

//     // gulp.watch("app/scss/*.scss", ['sass']);
//     gulp.watch("./index.html").on('change', ['build' , 'browserSync.reload']);
// });
// gulp.task('browserSync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
//     gulp.watch("./*.html")
//         .pipe(browserSync.reload({stream : true}))
// });
// gulp.task('watch',  
//  gulp.watch('./src/js/*.js') ['gulp build']
//     // gulp.watch('./src/scss/*.scss'),  build'; .on('change', browserSync.reload());
// )

gulp.task('cleanDist', () =>  {
    return gulp
        .src('./dist/*')
        .pipe(clean());
});

gulp.task('compileToCss', () => {
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
});

gulp.task('addPrefix', () => {
    return gulp
        .src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/css/'))
})

gulp.task('remoteUnusedCss', () => {
    return gulp.src('src/css/*.css')
    .pipe(purgecss({
        content: ['index.html']
    }))
    .pipe(gulp.dest('src/css/'))
})

gulp.task('concatAndMinifyCss', () => {
    return gulp
        .src('./src/css/*.css')
        .pipe(concat('styles.min.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./src/css/min/'))
})

gulp.task('concatAndMinifyJs', () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/min/'))
})

gulp.task('copyCssAndJsToDist', () => {
    return gulp
        .src('./src/css/min/styles.min.css')
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.src('./src/js/min/scripts.min.js'))
        .pipe(gulp.dest('./dist/'))
})

gulp.task('optmAndCopyImgToDist', () => {
    return gulp
        .src('src/img/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
})


gulp.task('build', gulp.series('cleanDist', 'compileToCss', 'addPrefix', 'remoteUnusedCss', 'concatAndMinifyCss', 'concatAndMinifyJs', 'copyCssAndJsToDist', 'optmAndCopyImgToDist'));

// gulp.task('dev', gulp.series('serve', 'build'));