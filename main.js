'use strict';

var electron = require('electron');
var menubar = require('menubar');
var Menu = electron.Menu;
var ipc = electron.ipcMain;
var Config = require('electron-config');
var config = new Config();

ipc.on("message" ,(ev, message) => {
    console.log(message);
})

if(process.env.npm_package_config_mode == 0) {
    //---- Test ----
    var app = electron.app,
        BrowserWindow = electron.BrowserWindow;
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
    var mb = menubar({});
    var app = mb.app,
        window = mb.window,
        tray = mb.tray;

    mb.on('ready', function() {
        WindowSetting(config.get("width"), config.get("height"), config.get("position"));
        Menu.setApplicationMenu(menu);
    })
}

function WindowSetting(width=-1, height=-1, pos=1) {
    var size = electron.screen.getPrimaryDisplay().workAreaSize;
    if(0 < width && 0 < height) {
        mb.setOption("width", width);
        mb.setOption("height", height);
    } else {
        mb.setOption("width", size.width/2);
        mb.setOption("height", size.height/2);
    }
    switch(pos) {
        case 0:
            mb.setOption("windowPosition", "topLeft");
            break;
        case 1:
            mb.setOption("windowPosition", "topRight");
            break;
        case 2:
            mb.setOption("windowPosition", "bottomLeft");
            break;
        case 3:
            mb.setOption("windowPosition", "bottomRight");
            break;
        default:
            mb.setOption("windowPosition", "topLeft");
            break;
    }
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
