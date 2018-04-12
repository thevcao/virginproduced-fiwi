(() => {
  'use strict';

  /*
  |-----------------------------------------------------------------------------
  | Load Environment Variables
  |-----------------------------------------------------------------------------
  */
  require('dotenv').config();

  /*
  |-----------------------------------------------------------------------------
  | Load Modules
  |-----------------------------------------------------------------------------
  */

  const gulp = require('gulp');
  const rename = require('gulp-rename');
  const plumber = require('gulp-plumber');
  const util = require('gulp-util');
  const clean = require('gulp-clean');

  // BrowserSync
  const browserSync = require('browser-sync').create();

  // Linters
  // eslint = require('gulp-eslint');
  const sassLint = require('gulp-sass-lint');

  // JS Related
  // uglify = require('gulp-uglify');
  const webpack = require('webpack-stream');

  // SCSS / CSS Related
  const plugins = require('gulp-load-plugins')({ camelize: true });
  const sass = require('gulp-sass');
  const autoprefixer = require('gulp-autoprefixer');
  const nano = require('gulp-cssnano');
  const gutil = require("gulp-util");
  const sassGlob = require('gulp-sass-glob');
  const sourcemaps = require('gulp-sourcemaps');
  const favicons = require("gulp-favicons");
  /*
  |-----------------------------------------------------------------------------
  | Global Config
  |-----------------------------------------------------------------------------
  */

  const themePath = './www/wp-content/themes/virginproduced';

  const cssFrameworks = [
  'node_modules/bootstrap/',
  ];

  const otherPaths = {
    staticFiles: [`${themePath}/index.html`],
    distPath: `${themePath}/dist`,
    webpackConfig: './webpack.config.js',
    webpackProdConfig: './webpack.prod.config.js',
  };

  /*
  |-----------------------------------------------------------------------------
  | BrowserSync Webserver
  |-----------------------------------------------------------------------------
  */

  /* Use this to serve static site i.e. decoupled from WP
   * Entrypoint: dist/index.html
   */
//  gulp.task('browser-sync', () => {
//    browserSync.init({
//      server: {
//        baseDir: `${themePath}/dist`,
//      },
//      port: 8080,
//      open: true,
//      browser: 'chrome',
//      notify: false,
//    });
//  });

  /* Proxy the wordpress server i.e. WP theme
   * Entrypoint: index.php
   */

  gulp.task("browser-sync", () => {
    browserSync.init({
      proxy: `${process.env.WP_HOME}`,
      port: 8000,
      open: true,
      browser: "chrome",
      notify: false
    });
  })

  /*
  |-----------------------------------------------------------------------------
  | Copy Static
  |-----------------------------------------------------------------------------
  */

  /** Cleanup Dist-Directories before Build */
  gulp.task('clean', () => {
    return gulp
      .src([`${otherPaths.distPath}/js`], {
        read: false,
      })
      .pipe(clean());
  });

  /*
  |-----------------------------------------------------------------------------
  | Webpack
  |-----------------------------------------------------------------------------
  */
  gulp.task('webpack:build', () => {
    webpack(require(otherPaths.webpackProdConfig)).pipe(
      gulp.dest(`${otherPaths.distPath}/js`),
    );
  });

  gulp.task('webpack', () => {
    const config = require(otherPaths.webpackConfig);
    config.watch = true;

    webpack(config).pipe(gulp.dest(`${otherPaths.distPath}/js`));
  });

  gulp.task('scripts', ['webpack']);

  /*
  |-----------------------------------------------------------------------------
  | Sass Stylesheets
  |-----------------------------------------------------------------------------
  */

  /** Linting Sass Code */
  gulp.task('lint-sass', () => {
    return gulp
        .src(`${themePath}/src/scss/main.scss`)
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError());
  });


// Favicons

  gulp.task("favicons", function () {
      return gulp.src(`${themePath}/src/img/favicons/favicon.png`).pipe(favicons({
      }))
      .on("error", util.log)
      .pipe(gulp.dest(`${themePath}/dist/img/favicons/`));
  });

  /** Compiling and bundeling Sass into single CSS-File */
  gulp.task('styles', () => {
//    return (
//      gulp
//        .src(`${themePath}/src/scss/main.scss`)
//        .pipe(
//          plumber(error => {
//            util.log(util.colors.red(error.message));
//            this.emit('end');
//          }),
//        )
//        .pipe(sassGlob())
//        .pipe(sourcemaps.init())
//        // Sass
//        .pipe(plugins.sass({ outputStyle: 'compressed', includePaths: cssFrameworks }))
//        .on('error', plugins.sass.logError)
//        // Prefixer, Compression, etc.
//        .pipe(
//          autoprefixer({
//            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
//            cascade: false,
//          }),
//        )
//        .pipe(nano())
////        .pipe(rename({ suffix: '.min' }))
//        .pipe(rename('custom.min.css'))
//        .pipe(gulp.dest(`${otherPaths.distPath}/css`))
//        .pipe(browserSync.stream())
//    );
  });
  /** Compiling and bundeling Sass into single CSS-File */
  gulp.task('admin-styles', () => {
    return (
      gulp
        .src(`${themePath}/admin/scss/main.scss`)
        .pipe(
          plumber(error => {
            util.log(util.colors.red(error.message));
            this.emit('end');
          }),
        )
        // Sass
        .pipe(sass().on('error', sass.logError))
        // Prefixer, Compression, etc.
        .pipe(
          autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'],
            cascade: false,
          }),
        )
        .pipe(nano())
//        .pipe(rename({ suffix: '.min' }))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(`${themePath}/admin/css/`))
        .pipe(browserSync.stream())
    );
  });

// Scripts task
  gulp.task('ext-scripts', () => {
    return gulp.src([
        `${themePath}/src/js/*.js`
    ])
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(plugins.plumber.stop())
    .pipe(gulp.dest(`${themePath}/dist/js`))
    .pipe(browserSync.stream())
    .pipe(plugins.size({ title: 'ext-scripts' }));
  })

        // Fonts
    gulp.task('fonts', () => {
      return gulp.src([
          `${themePath}/src/fonts/**/*`,
          'node_modules/font-awesome/fonts/*',
    //      'node_modules/slick-carousel/slick/fonts/*',
        ])
        .pipe(gulp.dest(`${themePath}/dist/fonts/`))
    })

  // Optimizes images
  gulp.task('images', () => {
    return gulp.src(`${themePath}/src/img/*`)
      .pipe(plugins.plumber())
      .pipe(plugins.imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [require('imagemin-pngquant')()]
      }))
      .pipe(plugins.plumber.stop())
      .pipe(gulp.dest(`${themePath}/dist/img/`))
      .pipe(plugins.size({ title: 'images' }));
  });

  /*
  |-----------------------------------------------------------------------------
  | Gulp Tasks
  |-----------------------------------------------------------------------------
  */

  /** Build Task */

  gulp.task('default', ['styles', 'admin-styles', 'images', 'fonts', 'favicons', 'ext-scripts', 'webpack:build']);
  gulp.task('dev', ['styles', 'admin-styles', 'images', 'fonts', 'favicons', 'ext-scripts', 'webpack']);

  /** Server Task */
  gulp.task('serve', ['dev', 'browser-sync'], () => {
    // Watch HTML
    gulp.watch(`${otherPaths.distPath}/index.html`, browserSync.reload);

    // Watch JS Scripts
    gulp.watch(`${otherPaths.distPath}/**/*.js`, browserSync.reload);

    // Watch Styles
    gulp.watch(`${themePath}/src/scss/*.scss`, ['styles']);
    gulp.watch(`${themePath}/src/img/*`, ['images']);
    gulp.watch(`${themePath}/src/scss/**/*.scss`, ['styles']);
    gulp.watch(`${themePath}/src/js/*.js`, ['ext-scripts']);
    gulp.watch(`${themePath}/admin/scss/*.scss`, ['admin-styles', browserSync.reload]);

    gulp.watch(['./gulpfile.js'], ['scripts', 'ext-scripts', 'styles', browserSync.reload]);
  });
})();
