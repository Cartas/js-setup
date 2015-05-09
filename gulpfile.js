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

gulp.task("default", function() {
	return gulp.src("src/scripts/**/*.js")
        .pipe(babel())
		.pipe(react())
        .pipe(eslint())
        .pipe(eslint.format())
		.pipe(concat("main.js"))
		.pipe(gulp.dest("dist/assets/js"))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/assets/js"))
		.pipe(notify({message: "Gulp complete."}));
});

gulp.task("build", ["clean", "default"], function() {

});


gulp.task("clean", function(callback) {
	del(["dist/assets/css", "dist/assets/js", "dist/assets/img"], callback);
});

gulp.task("watch", function() {
	// Watch .js files
	gulp.watch('src/scripts/**/*.js', ['default']);

	livereload.listen();

	gulp.watch(["dist/**"]).on("change", livereload.changed);
});
