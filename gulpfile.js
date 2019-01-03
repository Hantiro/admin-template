
var gulp = require('gulp');
var pkg = require('./package.json');
var plug = require('gulp-load-plugins')();
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var log = require('fancy-log');
var del = require('del');
var once = require('async-once');

/**
 * @desc Watch files
 */
gulp.task('watch', function () {
    gulp.watch(pkg.paths.js.concat(pkg.paths.html)).on('change', browserSync.reload);
    gulp.watch(pkg.paths.scss, gulp.series('sass'));
});

/**
 * @desc Create $templateCache from the html templates
 */
gulp.task('templatecache', function () {
    log('Creating an AngularJS $templateCache');
    return gulp
        .src([pkg.paths.html,
            "!"+pkg.paths.app+'bower_components/**/*.html',
            "!"+pkg.paths.app+'/index.html'])
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.core',
            standalone: false,
            root: './'
        }))
        .pipe(gulp.dest(pkg.paths.build));
});


/**
 * @desc Minify and bundle the app's JavaScript
 */
gulp.task('js', gulp.series('templatecache', function () {
    log('Bundling, minifying, and copying the app\'s JavaScript');
    var source = [].concat(pkg.paths.js);
    return gulp
        .src(source)
        // .pipe(plug.sourcemaps.init()) // get screwed up in the file rev process
        .pipe(plug.ngAnnotate({add: true, single_quotes: true}))
        // .pipe(plug.uglify({mangle: true, compress:{drop_debugger:true}}))
        .on('error', function (err) { console.log(err.toString()); })
        .pipe(plug.concat('all.min.js'))
        // .pipe(plug.sourcemaps.write('./'))
        .pipe(gulp.dest(pkg.paths.build));
}));

/**
 * @desc Copy the Vendor JavaScript
 */
gulp.task('vendorjs', function () {
    log('Bundling, minifying, and copying the Vendor JavaScript');
    return gulp.src(pkg.paths.vendorjs)
        .pipe(plug.concat('vendor.min.js'))
        // .pipe(plug.uglify())
        .pipe(gulp.dest(pkg.paths.build)); // + 'vendor'));
});


gulp.task('sass', function () {
    return gulp.src(pkg.paths.app + 'app.scss')
        .pipe(plug.sass().on('error', plug.sass.logError))
        .pipe(gulp.dest(pkg.paths.app + 'content/css'))
        .pipe(reload({stream: true}));
});

/**
 * @desc Minify and bundle the CSS
 */
gulp.task('css', gulp.series('sass', function () {
    log('Bundling, minifying, and copying the app\'s CSS');
    return gulp.src(pkg.paths.css)
        .pipe(plug.concat('all.min.css'))
        .pipe(plug.autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false,
            grid: true }))
        .pipe(cleanCss({ compatibility: '*' }))
        .pipe(gulp.dest(pkg.paths.build + 'content/css'));
}));

/**
 * @desc Minify and bundle the Vendor CSS
 */
gulp.task('vendorcss', function () {
    log('Compressing, bundling, copying vendor CSS');
    return gulp.src(pkg.paths.vendorcss)
        .pipe(plug.concat('vendor.min.css'))
        .pipe(cleanCss({}))
        .pipe(gulp.dest(pkg.paths.build + 'content/css'));
});

/**
 * @desc Create, connect to the server
 */
var reload = browserSync.reload;
gulp.task('connect', gulp.parallel('watch', function () {
    browserSync.init({
        notify: false,
        port: 1340,
        server: {
            baseDir: [
                './app'
            ]
        }
    });
}));

/**
 * @desc Copy fonts
 */
gulp.task('fonts', function () {
    var dest = pkg.paths.build + 'content/fonts';
    log('Copying fonts');
    return gulp.src(pkg.paths.fonts, { allowEmpty: true})
        .pipe(gulp.dest(dest));
});

/**
 * @desc Copy locale json
 */
gulp.task('locale', function () {
    var dest = pkg.paths.build + 'lang';
    log('Copying locale');
    return gulp
        .src(pkg.paths.locale)
        .pipe(gulp.dest(dest));
});

/**
 * Webfonts
 * @return {Stream}
 */
gulp.task('webfonts', function () {
    var dest = pkg.paths.build + 'content/webfonts';
    log('Copy webfonts');
    return gulp
        .src(pkg.paths.webfonts)
        .pipe(gulp.dest(dest));
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', function () {
    var dest = pkg.paths.build + 'content/img';
    log('Compressing, caching, and copying images');
    return gulp
        .src(pkg.paths.images)
        // .pipe(plug.cache(plug.imagemin({
        //     optimizationLevel: 3
        // })))
        .pipe(gulp.dest(dest));
});

/**
 * Inject all the files into the new index.html
 * rev, but no map
 * @return {Stream}
 */
gulp.task('rev-and-inject', gulp.series('locale','js', 'vendorjs', 'css', 'vendorcss', 'fonts','webfonts', 'images', function () {
    log('Rev\'ing files and building index.html');
    var minified = pkg.paths.build + '**/*.min.*';
    var index = pkg.paths.app + 'index.html';
    var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
    var indexFilter = plug.filter(['index.html']);
    return gulp
        .src([].concat(minified, index)) // add all staged min files and index.html
        .pipe(minFilter) // filter the stream to minified css and js
        // .pipe(plug.rev()) // create files with rev's
        .pipe(gulp.dest(pkg.paths.build)) // write the rev files
        // if we create and write rev.manifest here, replace doesn't happen.
        .pipe(minFilter.restore()) // remove filter, back to original stream
        .pipe(indexFilter) // filter to index.html
        .pipe(inject('content/css/vendor.min.css', 'inject-vendor'))
        .pipe(inject('content/css/all.min.css'))
        .pipe(inject('vendor.min.js', 'inject-vendor'))
        .pipe(inject('all.min.js'))
        .pipe(inject('templates.js', 'inject-templates'))
        .pipe(indexFilter.restore()) // remove filter, back to original stream
        .pipe(gulp.dest(pkg.paths.build)) // write the index.html file changes
        .pipe(gulp.dest(pkg.paths.build)); // write the manifest

    function inject(path, name) {
        var transform = function (filepath) {
            arguments[0] = filepath + '?v=' +  (new Date()).getTime();
            return plug.inject.transform.apply(plug.inject.transform, arguments);
        };
        var glob = pkg.paths.build + path;
        var options = {
            ignorePath: pkg.paths.build.substring(1),
            addRootSlash: false,
            transform: transform
        };
        if (name) {
            options.name = name;
        }
        return plug.inject(gulp.src(glob), options);
    }
}));


/**
 * Remove all files from the build folder
 * One way to run clean before all tasks is to run
 * from the cmd line: gulp clean && gulp build
 * @return {Stream}
 */
gulp.task('clean', function () {
    log('Cleaning: ' + pkg.paths.build);
    return del(pkg.paths.build,{force:true});
});

/**
 * Build the optimized app
 * @return {Stream}
 */
gulp.task('build', gulp.series('clean','rev-and-inject', function () {
    log('Building the optimized app');
    return gulp.src('./').pipe(plug.notify({
        onLast: true,
        message: 'Deployed code!'
    }));
}));

/**
 * Backwards compatible call to make stage and build equivalent
 */
gulp.task('stage', gulp.series('build', function () {
}));



gulp.task('default', gulp.series('sass', 'connect'));