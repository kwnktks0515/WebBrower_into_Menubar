'use strict';

class tab_maneger {
    constructor() {
        //config 
        var Config = require('electron-config');
        this.config = new Config();
        //tab information
        this.tab_homepageurl = this.config.get("url") || "https://google.co.jp";
        this.tab_count = 0;
        this.tab_active = 0;
        this.tab_views = [];
        //element model
        this.model_input = document.createElement("input");
        this.model_input.className = "hide";
        this.model_input.type = "radio";
        this.model_input.name = "tab";
        this.model_label = document.createElement("label");
        this.model_view = document.createElement("webview");
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
        var remove_element = document.getElementById("tab" + this.tab_count);
        remove_element.parentNode.removeChild(remove_element.nextElementSibling);
        remove_element.parentNode.removeChild(remove_element);
        remove_element = document.getElementById("view" + this.tab_count);
        remove_element.parentNode.removeChild(remove_element);
        this.tab_count -= 1;
    }
    add_element(tab=null, view=null) {
        this.add_tabs.appendChild(tab == null ? this.tab_model : tab); 
        this.add_view.appendChild(view == null ? this.webview_model : view);
    }
    //make
    get tab_model() {
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this.input_model);
        fragment.appendChild(this.label_model);
        return fragment;
    }
    get input_model() {
        var clone = this.model_input.cloneNode(true);
        clone.id = "tab" + (this.tab_count + 1);
        clone.setAttribute("onclick", "ChangeTab("+this.tab_count+")");
        return clone;
    }
    get label_model() {
        var clone = this.model_label.cloneNode(true);
        clone.setAttribute("for", "tab" + (this.tab_count + 1));
        clone.textContent = "Tab" + (this.tab_count + 1);
        return clone;
    }
    get webview_model() {
        var clone = this.model_view.cloneNode(true);
        clone.id = "view" + (this.tab_count + 1);
        clone.src = this.tab_homepageurl;
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
    //tab function
    back() {
        if(this.active.canGoBack()) 
            this.active.goBack();
    }
    forword() {
        if(this.active.canGoForward()) 
            this.active.goForward();
    }
    reload() {
        this.active.reload();
    }
    homepage() {
        this.active.loadURL(this.tab_homepageurl);
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