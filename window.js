'use strict';

var activetab = 0
var maxtabs = 2
var dom = []
var input = null
var homepageurl = "https://google.co.jp"

window.onload = function () {
    var fragment = document.createDocumentFragment()
    for(var i = 0;i < maxtabs;i++) {
        var element = document.createElement("input")
        element.id = "tab" + (i + 1)
        element.className = "hide"
        element.type = "radio"
        element.name = "tab"
        element.setAttribute("onclick", "ChangeTab("+i+")")
        if(i == 0) {
            element.checked = true
        }
        fragment.appendChild(element)
    }
    document.body.insertBefore(fragment, document.getElementById("back"))
    fragment = document.createDocumentFragment()
    for(var i = 0;i < maxtabs;i++) {
        var label = document.createElement("label")
        label.setAttribute("for", "tab" + (i + 1))
        label.textContent = "Tab" + (i + 1)
        fragment.appendChild(label)
    }
    document.getElementById("tabs").appendChild(fragment)
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