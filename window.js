'use strict';
 
var dom = null
var input = null
window.onload = function () {
    dom = document.getElementById("view1")
    input = document.getElementById("url")
    dom.addEventListener("load-commit", () => {
        input.value = dom.getURL()
    })
}

function KeyPressed(event) {
    console.log(event.target.value)
    if(event.keyCode!=13) return;
    dom.loadURL(event.target.value)
}

function Back() {
    if(dom.canGoBack()) {
        dom.goBack()
    }
}

function Forword() {
    if(dom.canGoForward()) {
        dom.goForward()
    }
}

function Reload() {
    dom.reload()
}

function HomePage() {
    dom.loadURL("http://www.google.co.jp")
}

function Setting() {

}