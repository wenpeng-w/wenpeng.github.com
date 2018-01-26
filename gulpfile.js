/**
 * Created by Administrator on 2017/11/15.
 */

'use strict';

// 载入gulp核心包
var gulp = require('gulp'),
    less = require('gulp-less'),
    cssMinify = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

// 新建 less 的任务
gulp.task('less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(cssMinify({
            advanced: false, // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',
            format: 'keep-breaks', // 类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*' // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('static/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('serve', function () {
    gulp.start('less');
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
});
// 监听所有打包之后的文件变动，自动刷新页面
gulp.task('default', ['serve']);
