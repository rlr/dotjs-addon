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
    // we only operate on http urls? what about chrome or resource?
    if (document.URL.indexOf('http') === 0) {
        self.postMessage(document.URL);    
    }
}(jQuery.noConflict(true)));
