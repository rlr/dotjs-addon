var pageMod = require('page-mod'),
    data = require('self').data,
    file = require('file'),
    url = require('url');

pageMod.PageMod({
    include: "*",
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('jquery-1.5.min.js'),
    contentScript:
        '(function($) {' +
            'onMessage = function onMessage(script) { eval(script); };' +
            'postMessage(document.URL);' +
        '}(jQuery.noConflict(true)));',
    onAttach: function onAttach(worker) {
        worker.on('message', function(data) {
            var domain = url.URL(data).host;
            if (domain.indexOf('www.') === 0) {
                domain = domain.substring(4, domain.length);
            }
            var files = ['default', domain];
            for (var i=0; i < files.length; i++) {
                filename = '~/.js/' + files[i] + '.js';
                if (file.exists(filename)) {
                    worker.postMessage(file.read(filename));
                }
            }
        });
    }
});
