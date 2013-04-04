/*
 * catch the 'load-scripts' event and inject the resilts into the current scope.
 */
(function() {
    self.port.on('load-scripts', function(msg) {
        // bail out if we're in an iframe
        if (window.frameElement) return;

        if (msg.jquery) {
            eval(msg.jquery);
        }

        msg.js.forEach(function(script) {
            eval(script);
        });

        if (msg.coffee) {
            (function() {
                eval(msg.transpiler);
            }).call(window); // coffee-script.js assumes this === window
        }
        msg.coffee.forEach(function(script) {
            eval(CoffeeScript.compile(script));
        });

        msg.css.forEach(function(styles) {
            var headNode = document.querySelector('head');
            var cssNode = document.createElement('style');
            cssNode.innerHTML = styles;
            headNode.appendChild(cssNode);
        });
    });

    if (document.URL.indexOf('http') === 0) {
        self.port.emit('init', document.URL);
    }
})();