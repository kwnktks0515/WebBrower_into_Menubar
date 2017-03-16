'use strict';

var activetab = 0
var maxtab = 2
var dom = []
var input = null

window.onload = function () {
    dom.push(document.getElementById("view1"))
    dom.push(document.getElementById("view2"))
    input = document.getElementById("url")
    for(var i = 0;i < dom.length;i++) {
        dom[i].addEventListener("load-commit", (event) => {
            input.value = event.target.getURL()
        })
    }
}

function KeyPressed(event) {
    console.log(event.target.value)
    if(event.keyCode!=13) return;
    dom[activetab].loadURL(event.target.value)
}

function Back() {
    if(dom[activetab].canGoBack()) {
        dom[activetab].goBack()
    }
}

function Forword() {
    if(dom[activetab].canGoForward()) {
        dom[activetab].goForward()
    }
}

function Reload() {
    dom[activetab].reload()
}

function HomePage() {
    dom[activetab].loadURL("http://www.google.co.jp")
}

function Setting() {

}

function ChangeTab(num) {
    activetab = num
    input.value = dom[activetab].getURL()
}