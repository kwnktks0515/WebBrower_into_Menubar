'use strict';

var electron = require('electron')
var menubar = require('menubar')


//---- use ----
var mb = menubar({})
var app = mb.app
var window = mb.window
var tray = mb.tray

mb.on('ready', function ready () {
    console.log('app is ready')
    var size = electron.screen.getPrimaryDisplay().workAreaSize;
    WindowSetting(size.width/2, size.height/2, size.width)
})

function WindowSetting(width=-1, height=-1, x=-1, y=-1) {
    if(width != -1) mb.setOption("width", width)
    if(height != -1) mb.setOption("height", height);
    if(x != -1) mb.setOption("x", x)
    if(y != -1) mb.setOption("y", y)
}

//---Test---
/*
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('ready', function() {

    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
        mainWindow.toggleDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
*/