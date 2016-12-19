var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var src = '',
    dist = 'herop',  // Distribution Directory
    paths = {
        favicon: [src + 'favicon.ico', src + 'favicon.png'],
        img: src + 'img/**',
        html: src + '*.html',
        css: src + 'css/**/*.css',
        scss: src + 'css/**/*.scss',
        js: src + 'js/*.js'
    };

// localhost:8000
gulp.task('server', function () {
    return gulp.src(dist + '/')
        .pipe(plugins.webserver());
});

gulp.task('move-favicon', function () {
    return gulp.src(paths.favicon)
        .pipe(gulp.dest(dist + '/'));
});

gulp.task('move-images', function () {
    return gulp.src(paths.img)
        .pipe(gulp.dest(dist + '/img'));
});

gulp.task('compress-html', function () {
    return gulp.src(paths.html)
        .pipe(plugins.htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dist + '/'));
});

gulp.task('compress-css', function () {
    return gulp.src(['*/reset.css', paths.css])
        .pipe(plugins.concat('main.css'))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest(dist + '/css'));
});

gulp.task('compile-sass', function () {
    return gulp.src(paths.scss)
        .pipe(plugins.sass())
        .pipe(gulp.dest(dist + '/css'));
});

gulp.task('combine-js', function () {
    return gulp.src(paths.js)
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dist + '/js'));
});

gulp.task('move-libraries', function () {
    return gulp.src(src + 'js/lib/**')
        .pipe(gulp.dest(dist + '/js/lib'));
});

gulp.task('move-plugins', function () {
    return gulp.src(src + 'js/plugins/**')
        .pipe(gulp.dest(dist + '/js/plugins'));
});

gulp.task('watch', function () {
    plugins.livereload.listen();
    gulp.watch(paths.js, ['combine-js']);
    gulp.watch(paths.css, ['compress-css']);
    gulp.watch(paths.scss, ['compile-sass']);
    gulp.watch(paths.html, ['compress-html']);
    gulp.watch(dist + '/**').on('change', plugins.livereload.changed);
});

// Default Task
gulp.task('default', [
    'server',
    'move-favicon',
    'move-images',
    'compress-html',
    'compress-css',
    'compile-sass',
    'combine-js',
    'move-libraries',
    'move-plugins',
    'watch'
]);