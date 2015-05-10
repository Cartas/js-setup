var gulp = require("gulp");
var uglify = require("gulp-uglify");
var htmlreplace = require("gulp-html-replace");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var watchify = require("watchify");
var reactify = require("reactify");
var streamify = require("gulp-streamify");
var livereload = require("gulp-livereload");
var notify = require("gulp-notify");
var eslint = require("gulp-eslint");
var babel = require("gulp-babel");
var del = require("del");

var path = {
  HTML: "src/index.html",
  MINIFIED_OUT: "build.min.js",
  OUT: "build.js",
  DEST: "dist",
  DEST_BUILD: "dist/build",
  DEST_SRC: "dist/src",
  ENTRY_POINT: "./src/scripts/app.js"
};

gulp.task("lint", function() {
  gulp.src([path.ENTRY_POINT, "src/scripts/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("copy", function() {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task("watch", function() {
  gulp.watch("src/scripts/**/*.js", ["lint"]);
  gulp.watch(path.HTML, ["replaceSrcHTML"]);

  livereload.listen();

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {},
    packagingCache: {},
    fullPaths: true
  }));

  return watcher.on("update", function() {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      .pipe(livereload());
  }).bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task("build", function() {
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  }).bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify({file: path.MINIFIED_OUT})))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task("replaceSrcHTML", function() {
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      "js": "src/" + path.OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task("replaceHTML", function() {
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      "js": "build/" + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task("default", ["watch"]);
gulp.task("production", ["replaceHTML", "build"]);
