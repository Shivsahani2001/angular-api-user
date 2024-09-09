const gulp = require("gulp");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();


const scripts = require("./scripts");
const styles = require("./styles");

var devMode = false;



gulp.task("css",function(){
    return gulp.src(styles)
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task("js",function(){
    return gulp.src(scripts)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task("html",function() {
    return gulp.src('./src/templates/**/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
        stream:true
    }));
});


gulp.task("build",gulp.series("css","js","html",));

gulp.task('browser-sync',function(done){
    browserSync.init({
        open: false,
        server: {baseDir: 'dist'},
        port:3000
    });
    console.log(`BrowserSync is runing at : http://localhost:3000`);
    done();
});

gulp.task ('watch',function(){
    gulp.watch(['./src/css/**/*.css'],gulp.series('css'));
    gulp.watch(['./src/js/**/*.js'],gulp.series('js'));
    gulp.watch(['./src/templates/**/*.html'],gulp.series('html'));
});

gulp.task('start',gulp.series("build",gulp.parallel("browser-sync","watch")));

 