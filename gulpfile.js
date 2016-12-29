var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var src = '',
    dist = 'herop',  // Distribution Directory
    paths = {
        img: src + 'img/**',
        favicon: [src + 'favicon.ico', src + 'favicon.png'],
        html: [
            src + 'index.html'
        ],
        css: [
            src + 'css/main.css'
        ],
        scss: [
            src + 'scss/main.scss'
        ],
        js: [
            src + 'js/main.js'
        ]
    };

// localhost:8000
gulp.task('server', function () {
    return gulp.src(dist + '/')
        .pipe(plugins.webserver());
});

// Move all favicon
gulp.task('move-favicon', function () {
    return gulp.src(paths.favicon)
        .pipe(gulp.dest(dist + '/'));
});

// Move all images
gulp.task('move-images', function () {
    return gulp.src(paths.img)
        .pipe(gulp.dest(dist + '/img'));
});

// Move all Javascript Libraries
gulp.task('move-libraries', function () {
    return gulp.src(src + 'js/lib/**')
        .pipe(gulp.dest(dist + '/js/lib'));
});

// Move all Javascript Plugins
gulp.task('move-plugins', function () {
    return gulp.src(src + 'js/plugins/**')
        .pipe(gulp.dest(dist + '/js/plugins'));
});

// Move HTML
gulp.task('move-html', function () {
    return gulp.src(paths.html)
        .pipe(gulp.dest(dist + '/'));
});

// Merge CSS
gulp.task('merge-css', function () {
    return gulp.src(paths.css)
        .pipe(plugins.concat('main.css'))
        .pipe(gulp.dest(dist + '/css'));
});

// Compile the SCSS
gulp.task('compile-sass', function () {
    return gulp.src(paths.scss)
        .pipe(plugins.sass())
        .pipe(gulp.dest(dist + '/css'));
});

// Uglify the JavaScript => main.js
gulp.task('combine-js', function () {
    return gulp.src(paths.js)
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dist + '/js'));
});

gulp.task('watch', function () {
    plugins.livereload.listen();
    gulp.watch(paths.html, ['move-html']);
    gulp.watch(paths.css, ['merge-css']);
    gulp.watch(paths.scss, ['compile-sass']);
    gulp.watch(paths.js, ['combine-js', 'move-libraries', 'move-plugins']);
    gulp.watch(dist + '/**').on('change', plugins.livereload.changed);
});

// Default Task
gulp.task('default', [
    'server',
    'move-favicon',
    'move-images',
    'move-html',
    'merge-css',
    'compile-sass',
    'combine-js',
    'move-libraries',
    'move-plugins',
    'watch'
]);