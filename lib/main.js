const data = require('self').data,
    url = require('url');

// debugging
var L = console.log, 
D = function(o) { return JSON.stringify(o, null, '    '); };

const tabs = require("tabs");

tabs.on('ready', function(tab) {
    var worker = tab.attach({
        contentScriptFile: [data.url('dotjs.js')]
    });

    worker.port.on('init', function(domain) {
        let host = url.URL(domain).host;
        if (!host)
            return;

        if (host.indexOf('www.') === 0) {
            host = host.substring(4, host.length);
        }

        let matchFile = require("dotjs").matchFile;
        let files = matchFile(host);
        worker.port.emit('load-scripts', files);
    });
});
