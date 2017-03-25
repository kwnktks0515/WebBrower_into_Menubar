class tab_maneger {
    constructor() {
        this._count = 0;
        this._input_model = document.createElement("input");
        this._input_model.className = "hide";
        this._input_model.type = "radio";
        this._input_model.name = "tab";
        this._label_model = document.createElement("label");
        this._webview_model = document.createElement("webview");
        this._webview_model.src = homepageurl;
    }
    add() {
        this._count += 1;
    }
    take() {
        var remove_element = document.getElementById("tab" + this._count);
        remove_element.parentNode.removeChild(remove_element.nextElementSibling);
        remove_element.parentNode.removeChild(remove_element);
        remove_element = document.getElementById("view" + this._count);
        remove_element.parentNode.removeChild(remove_element);
        this._count -= 1;
    }
    //management
    get count() {
        return this._count;
    }
    //make
    get tab_model() {
        var fragment = document.createDocumentFragment();
        fragment.appendChild(this.input_model);
        fragment.appendChild(this.label_model);
        return fragment;
    }
    get input_model() {
        var clone = this._input_model.cloneNode(true);
        clone.id = "tab" + (this._count + 1);
        clone.setAttribute("onclick", "ChangeTab("+this._count+")");
        return clone;
    }
    get label_model() {
        var clone = this._label_model.cloneNode(true);
        clone.setAttribute("for", "tab" + (this._count + 1));
        clone.textContent = "Tab" + (this._count + 1);
        return clone;
    }
    get webview_model() {
        var clone = this._webview_model.cloneNode(true);
        clone.id = "view" + (this._count + 1);
        return clone;
    }
}