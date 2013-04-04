const data = require('self').data,
    url = require('url'),
    matchFile = require("dotjs").matchFile;

require("page-mod").PageMod({
    include: "*",
    contentScriptFile: data.url('dotjs.js'),
    contentScriptWhen: 'ready',
    onAttach: function (worker) {
        worker.port.on('init', function(domain) {
            let host = url.URL(domain).host;
            if (!host)
                return;

            if (host.indexOf('www.') === 0) {
                host = host.substring(4, host.length);
            }

            let files = matchFile(host);

            // how to tell from here if we actually matched something?
            if (files.match) {
                worker.port.emit('load-scripts', files);
            }
        });
    }
});
