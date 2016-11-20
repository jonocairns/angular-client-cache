'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('gulp-rimraf'),
    Config = require('./gulpfile.config'),
	karma = require('karma').Server;

var config = new Config();

/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('gen-ts-refs', function () {
    var target = gulp.src(config.appTypeScriptReferences);
    var sources = gulp.src([config.allTypeScript], {read: false});
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="../..' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task("ts-lint", () =>
    gulp.src("source.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions, //reference to library .d.ts files
                         config.appTypeScriptReferences];     //reference to app.d.ts files

    var tsResult = gulp.src(sourceTsFiles)
                       .pipe(sourcemaps.init())
                       .pipe(tsc({
                           target: 'ES5',
                           declarationFiles: false
                       }));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest(config.tsOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean-ts', function () {
  var typeScriptGenFiles = [config.tsOutputPath,            // path to generated JS files
                            config.sourceApp +'**/*.js',    // path to all JS files auto gen'd by editor
                            config.sourceApp +'**/*.js.map' // path to all sourcemap files auto gen'd by editor
                           ];

  // delete the files
  return gulp.src(typeScriptGenFiles, {read: false})
      .pipe(rimraf());
});

gulp.task('test', function() {
  new karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }).start();
});

var uglify = require('gulp-uglifyjs');

gulp.task('uglify', function() {
  gulp.src('dist/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/bin'))
});

gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['ts-lint', 'compile-ts', 'gen-ts-refs', 'test']);
    gulp.watch([config.testFiles], ['test']);
});

gulp.task('default', ['ts-lint', 'compile-ts', 'gen-ts-refs', 'test', 'uglify', 'watch']);
