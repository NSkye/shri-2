'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const pug = require('gulp-pug');
const { spawn } = require('child_process');
const fs = require('fs');

function buildHTML() {
    const data = JSON.parse(fs.readFileSync('./src/data/data.json'));
    return gulp.src('src/index.pug')
    .pipe(pug({
        locals: { data }
    }))
    .pipe(gulp.dest('public'))
}
function buildWebpack(done) {
    const buildProcess = spawn('npm', ['run', 'build-webpack']);
    buildProcess.on('close', code => {
        console.log(`webpack process finished with code ${code}`);
        done();
    });
}

gulp.task('refresh', function(done) {
    browserSync.reload();
    done();
});
gulp.task('browser-sync', function(done) {
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
    gulp.watch('src/**/*.pug', gulp.series('views-refresh'));
    gulp.watch('src/data/*.json', gulp.series('views-refresh'));
    gulp.watch('src/**/*.js', gulp.series('webpack-refresh'));
    gulp.watch('src/**/*.styl', gulp.series('webpack-refresh'));
    done();
});
gulp.task('views', buildHTML);
gulp.task('views-refresh', gulp.series('views', 'refresh'));
gulp.task('webpack', buildWebpack);
gulp.task('webpack-refresh', gulp.series('webpack', 'refresh'));
gulp.task('build', gulp.series('views', 'webpack'));

gulp.task('run', gulp.series('build', 'browser-sync'));
