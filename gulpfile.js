var gulp = require("gulp");

var del = require("del");

gulp.task("del", function() {
    return del.sync("./dist/**/*.js");
});

var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var util = require("gulp-util");
var es = require("event-stream");
var glob = require("glob");

gulp.task("build", function(done) {
    var extensions = ["js", "jsx"];
    
    glob("./src/global-**.{" + extensions.join(",") + "}", function(err, files) {
        if (err) {
            done(err);
            return;
        }
        
        if (files == null) {
            done();
            return;
        }
        
        var tasks = files.map(function(entry) {
            var babelCfg = {
                compact: true,
                comments: false
            };
            
            if (entry.match(/\.jsx$/)) {
                babelCfg.presets = ["react"];
            }
            
            var rename = /\/global-([^\/]+)\..+$/.exec(entry)[1] + ".js";
            
            return browserify({
                extensions: extensions.map(function(val) {return "." + val;}),
                entries: [entry],
                transform: [
                    babelify.configure(babelCfg)
                ]
            })
                .bundle()
                .pipe(source(rename))
                .pipe(buffer())
                .on("error", util.log)
                .pipe(gulp.dest("./dist"));
        });
        
        task = es.merge(tasks).on("end", done);
    });
});

gulp.task("default", ["del", "build"]);
