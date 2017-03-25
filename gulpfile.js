'use strict';
var gulp = require("gulp"),
    electron = require('electron-connect').server.create();

gulp.task('default', function () {
    electron.start();
    gulp.watch(['./main.js', './index.html'], electron.restart);
    gulp.watch(['./style.css', './first.html', './window.js', "./lib.js"], electron.reload);
});