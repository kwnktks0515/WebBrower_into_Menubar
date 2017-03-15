'use strict';

var electron = require('electron')
var menubar = require('menubar')
var Menu = electron.Menu

if(process.env.npm_package_config_mode == 0) {
    //---- Test ----
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
} else {
    //--- Build ---
    var mb = menubar({})
    var app = mb.app
    var window = mb.window
    var tray = mb.tray

    mb.on('ready', function ready () {
        console.log('app is ready')
        var size = electron.screen.getPrimaryDisplay().workAreaSize;
        WindowSetting(size.width/2, size.height/2, size.width)
        //window.toggleDevTools();
        Menu.setApplicationMenu(menu)
    })
}

function WindowSetting(width=-1, height=-1, x=-1, y=-1) {
    if(width != -1) mb.setOption("width", width)
    if(height != -1) mb.setOption("height", height);
    if(x != -1) mb.setOption("x", x)
    if(y != -1) mb.setOption("y", y)
}

var menu = Menu.buildFromTemplate([
    {
        label: "Application",
        submenu: [
            { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }},
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    }
])
