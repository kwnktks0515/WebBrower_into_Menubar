'use strict';

var activetab = 0
var maxtabs = 2
var dom = []
var input = null
var tab = null
var homepageurl = "https://google.co.jp"

window.onload = function () {
    var tab_elements = document.createDocumentFragment(),
        webview_elements = document.createDocumentFragment()
    tab = new tab_maneger()
    input = document.getElementById("url")
    for(var i = 0;i < maxtabs;i++) {
        //input
        var input_clone = tab.get_input_model()
        if(i == 0) input_clone.checked = true
        tab_elements.appendChild(input_clone)
        //label
        var label_clone = tab.get_label_model()
        tab_elements.appendChild(label_clone)
        //webview
        var webview_clone = tab.get_webview_model()
        if(i != 0) webview_clone.className = "hide"
        webview_clone.addEventListener("load-commit", (event) => {
            input.value = event.target.getURL()
            //console.log(event.target.getTitle())
        })
        dom.push(webview_clone)
        webview_elements.appendChild(webview_clone)
        tab.add()
    }
    document.getElementById("tabs").appendChild(tab_elements)
    document.getElementById("view-container").appendChild(webview_elements)
}

function KeyPressed(event) {
    if(event.keyCode!=13) return;
    dom[activetab].loadURL(event.target.value)
}

function Back() {
    if(dom[activetab].canGoBack()) 
        dom[activetab].goBack()
}

function Forword() {
    if(dom[activetab].canGoForward()) 
        dom[activetab].goForward()
}

function Reload() {
    dom[activetab].reload()
}

function HomePage() {
    dom[activetab].loadURL(homepageurl)
}

function Setting() {

}

function ChangeTab(num) {
    dom[activetab].classList.add("hide")
    activetab = num
    dom[activetab].classList.remove("hide")
    input.value = dom[activetab].getURL()
}