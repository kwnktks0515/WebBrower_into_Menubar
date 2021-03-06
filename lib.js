'use strict';

class tab_maneger {
    constructor() {
        //config 
        var Config = require('electron-config');
        this.config = new Config();
        //tab information
        this.tab_homepageurl = this.config.get("url") || "https://www.google.co.jp";
        this.tab_count = 0;
        this.tab_active = 0;
        this.tab_views = [];
        this.tab_events = {};
        //Add destination
        this.add_tabs = document.getElementById("tabs");
        this.add_view = document.getElementById("view-container");
    }
    //function
    add(element) {
        this.tab_views.push(element);
        this.tab_count += 1;
    }
    take() {
        if(this.tab_count - 1 == this.tab_active) {
            document.getElementById("tab" + this.tab_active).checked = true;
            this.changetab(this.tab_active - 1);
        }
        var remove_element = document.getElementById("tab" + this.tab_count);
        remove_element.parentNode.removeChild(remove_element.nextElementSibling);
        remove_element.parentNode.removeChild(remove_element);
        remove_element = this.tab_views.pop();
        remove_element.parentNode.removeChild(remove_element);
        this.tab_count -= 1;
    }
    add_element(tab=null, view=null) {
        this.add_tabs.appendChild(tab == null ? this.tab_model : tab); 
        this.add_view.appendChild(view == null ? this.webview_model : view);
    }
    set_event(element) {
        /*
        "load-commit", "did-finish-load", "did-fail-load", "did-frame-finish-load", "did-start-loading", "did-stop-loading", "did-get-response-details", "did-get-redirect-request", "dom-ready", "page-title-updated", "page-favicon-updated", "enter-html-full-screen", "leave-html-full-screen", "console-message", "found-in-page", "new-window", "will-navigate", "did-navigate", "did-navigate-in-page", "close", "ipc-message", "crashed", "gpu-crashed", "plugin-crashed", "destroyed", "media-started-playing", "media-paused", "did-change-theme-color", "update-target-url", "devtools-opened", "devtools-closed", "devtools-focused"
        */
        for(var key in this.tab_events) {
            element.addEventListener(key, this.tab_events[key]);
        }
    }
    set events(obj) {
        this.tab_events = obj;
    }
    //make
    get tab_model() {
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this.input_model);
        fragment.appendChild(this.label_model);
        return fragment;
    }
    get input_model() {
        var clone = document.createElement("input");
        clone.className = "hide";
        clone.type = "radio";
        clone.name = "tab";
        clone.id = "tab" + (this.tab_count + 1);
        clone.setAttribute("onclick", "ChangeTab("+this.tab_count+")");
        return clone;
    }
    get label_model() {
        var clone = document.createElement("label");
        clone.setAttribute("for", "tab" + (this.tab_count + 1));
        clone.textContent = "Tab" + (this.tab_count + 1);
        return clone;
    }
    get webview_model() {
        var clone = document.createElement("webview");
        clone.id = "view" + (this.tab_count + 1);
        clone.src = this.tab_homepageurl;
        this.set_event(clone);
        return clone;
    }
    //management
    get count() {
        return this.tab_count;
    }
    get active() {
        return this.tab_views[this.tab_active];
    }
    set active(num) {
        this.tab_active = num;
    }
    get url() {
        return this.active.getURL()
    }
    set url(url) {
        this.active.loadURL(url);
    }
    get title() {
        return this.active.getTitle()
    }
    //tab function
    back() {
        if(this.active.canGoBack()) 
            this.active.goBack();
        else
            console.log("Can't go back");
    }
    forword() {
        if(this.active.canGoForward()) 
            this.active.goForward();
        else
            console.log("Can't go forword");
    }
    reload() {
        this.active.reload();
    }
    homepage() {
        this.url = this.tab_homepageurl;
    }
    setting() {

    }
    mute() {
        if(this.active.isAudioMuted())
            this.active.setAudioMuted(false);
        else
            this.active.setAudioMuted(true);
    }
    changetab(num) {
        this.active.classList.add("hide");
        this.active = num;
        this.active.classList.remove("hide");
    }
}