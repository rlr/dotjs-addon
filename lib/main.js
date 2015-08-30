const data = require('sdk/self').data,
    url = require('sdk/url'),
    matchFile = require("./dotjs").matchFile;

require("sdk/page-mod").PageMod({
    include: "*",
    contentScriptFile: data.url('dotjs.js'),
    contentScriptWhen: 'ready',
    onAttach: function (worker) {
        worker.port.on('init', function(domain) {
            let host = url.URL(domain).host;

            for (let dot; host && dot != -1;) {

                let files = matchFile(host);

                if (files && files.match) {
                    worker.port.emit('load-scripts', files);
                }

                dot = host.indexOf('.');
                host = host.substring(dot + 1);
            }
        });
    }
});
