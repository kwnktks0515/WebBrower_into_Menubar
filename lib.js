function tab_maneger() {
    this.count = 0
    this.input_model = document.createElement("input")
    this.input_model.className = "hide"
    this.input_model.type = "radio"
    this.input_model.name = "tab"
    this.label_model = document.createElement("label")
    this.webview_model = document.createElement("webview")
    this.webview_model.src = homepageurl
}
tab_maneger.prototype = {
    add: function() {
        this.count += 1
    },
    take: function() {
        this.count -= 1
    },
    get_input_model: function() {
        var clone = this.input_model.cloneNode(true)
        clone.id = "tab" + (this.count + 1)
        clone.setAttribute("onclick", "ChangeTab("+this.count+")")
        return clone
    },
    get_label_model: function() {
        var clone = this.label_model.cloneNode(true)
        clone.setAttribute("for", "tab" + (this.count + 1))
        clone.textContent = "Tab" + (this.count + 1)
        return clone
    },
    get_webview_model: function() {
        var clone = this.webview_model.cloneNode(true)
        clone.id = "view" + (this.count + 1)
        return clone
    }
}