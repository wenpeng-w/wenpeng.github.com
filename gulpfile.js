/**
 * Created by Administrator on 2017/11/15.
 */

'use strict';

// 载入gulp核心包
var gulp = require('gulp'),
    less = require('gulp-less'),
    cssMinify = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    jsMinfy = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

// 新建 less 的任务
gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(rename({suffix: '.min'}))
        .pipe(cssMinify({
            advanced: false, // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',
            keepSpecialComments: '*' // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('static/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 新建 js 的任务
gulp.task('minjs', function () {
    gulp.src(['static/js/*.js', '!static/js/*.min.js'])
        .pipe(rename({suffix:'.min'}))
        .pipe(jsMinfy())
        .pipe(gulp.dest('static/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('serve', function () {
    gulp.start('less', 'minjs');
    browserSync.init({
        //指定服务器启动根目录
        server: {
            baseDir: [
                'dist'
            ]
        },
        port: 3131,
        open: false
    });
    gulp.watch('less/*.less', ['less']);
    gulp.watch('static/js/*.js', ['minjs']);
});
// 监听所有打包之后的文件变动，自动刷新页面
gulp.task('default', ['serve']);
