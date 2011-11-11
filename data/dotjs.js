(function($) {
    self.on("message", function(msg) {
        if (msg.js) {
            eval(msg.js);
        }
        if (msg.coffee) {
            (function() {
                eval(msg.transpiler);
            }).call(window); // coffee-script.js assumes this === window
            eval(CoffeeScript.compile(msg.coffee));
        }
        if (msg.css) {
            $('head').append($('<style>').text(msg.css));
        }
    });
    self.postMessage(document.URL);
}(jQuery.noConflict(true)));
