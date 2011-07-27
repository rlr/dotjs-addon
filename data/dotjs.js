(function($) {

self.on("message", function(msg) {
    var _window = new XPCNativeWrapper(content, "window").wrappedJSObject;

    (function(window, document) {
        if (msg.js) {
            eval(msg.js);
        }
        if (msg.coffee) {
            eval(msg.transpiler);
            eval(CoffeeScript.compile(msg.coffee));
        }
        if (msg.css) {
            $('head').append($('<style>').text(msg.css));
        }
    }).call(_window, _window, _window.document);
});

self.postMessage(document.URL);

}(jQuery.noConflict(true)));
