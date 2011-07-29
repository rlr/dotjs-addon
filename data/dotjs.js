(function($) {

self.on("message", function(msg) {
    var _window = new XPCNativeWrapper(content, "window").wrappedJSObject;

    (function(window, document) {
        if (msg.js) {
            eval(msg.js);
        }
        if (msg.coffee) {
            eval(msg.transpiler);
            eval(this.CoffeeScript.compile(msg.coffee));
        }
    }).call(_window, _window, _window.document);
    if (msg.css) {
        $('head').append($('<style>').text(msg.css));
    }
});

self.postMessage(document.URL);

}(jQuery.noConflict(true)));
