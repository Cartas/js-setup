var gulp = require("gulp");
var react = require("gulp-react");
var notify = require("gulp-notify");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var eslint = require("gulp-eslint");
var babel = require("gulp-babel");
var livereload = require("gulp-livereload");
var del = require("del");
var htmlreplace = require("gulp-html-replace");

var htmlPath = "src/index.html";
var jsPath = "src/scripts/**/*.js";

var path = {
  HTML: htmlPath,
  JS: jsPath,
  ALL: [htmlPath, jsPath],
  MINIFIED: "build.min.js",
  DEST_SRC: "dist/src",
  DEST_BUILD: "dist/build",
  DEST: "dist"
};


gulp.task("transform", function() {
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task("copy", function() {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task("watch", function() {
  gulp.watch(path.ALL, ["transform", "copy"]);

  livereload.listen();
  gulp.watch(["dist/**"]).on("change", livereload.changed);
});

gulp.task("build", function() {
  gulp.src(path.JS)
    .pipe(react())
    .pipe(concat(path.MINIFIED))
    .pipe(uglify({file: path.MINIFIED}))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task("replaceHTML", function() {
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      "js": "build/" + path.MINIFIED
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task("default", ["watch"]);

gulp.task("production", ["replaceHTML", "build"]);
