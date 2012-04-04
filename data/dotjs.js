// debugging
var L = console.log, 
D = function(o) { return JSON.stringify(o, null, '    '); };

(function() {
    self.port.on("load-scripts", function(msg) {
        if (msg.jquery) {
            eval(msg.jquery);
        }
        else {
            // jQuery is a hard requirement.
            return;
        }
        if (msg.js) {
            eval(msg.js);
        }
        if (msg.coffee) {
            (function() {
                eval(msg.transpiler);
            }).call(window); // coffee-script.js assumes this === window
            eval(CoffeeScript.compile(msg.coffee));
        }
        // needs testing...
        if (msg.css) {            
            var headNode = document.querySelector('head');
            var cssNode = document.createElement('style');
            cssNode.innerHTML = msg.css;
            headNode.appendChild(cssNode);
        }
    });

    if (document.URL.indexOf('http') === 0) {
        self.port.emit('init', document.URL);    
    }
})();
