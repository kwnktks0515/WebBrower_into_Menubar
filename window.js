'use strict';

var input = null;
var tab = null;

window.onload = function () {
    var tab_elements = document.createDocumentFragment(),
        webview_elements = document.createDocumentFragment();
    tab = new tab_maneger();
    input = document.getElementById("url");
    tab.events = {
        "page-title-updated": (event) => { console.log("Update"); input.value = event.target.getURL(); }
    }
    for(var i = 0;i < 1;i++) {
        //input 
        var input_clone = tab.input_model;
        if(i == 0) input_clone.checked = true;
        tab_elements.appendChild(input_clone);
        //label
        var label_clone = tab.label_model;
        tab_elements.appendChild(label_clone);
        //webview
        var webview_clone = tab.webview_model;
        if(i != 0) webview_clone.className = "hide";
        webview_elements.appendChild(webview_clone);
        tab.add(webview_clone);
    }
    tab.add_element(tab_elements, webview_elements);
}

function AddTab() {
    var webview_clone = tab.webview_model;
    webview_clone.className = "hide";
    tab.add_element(null, webview_clone);
    tab.add(webview_clone);
}

function RemoveTab() { tab.take(); }

function KeyPressed(event) {
    if(event.keyCode!=13) return;
    tab.active.loadURL(event.target.value);
}

function Back() { tab.back(); }
function Forword() { tab.forword(); }
function Reload() { tab.reload(); }
function HomePage() { tab.homepage(); }

function Setting() {
    var ipc = require("electron").ipcRenderer
    ipc.send("message", "ping")
}

function Mute() { tab.mute(); }

function ChangeTab(num) {
    tab.changetab(num);
    input.value = tab.url
}