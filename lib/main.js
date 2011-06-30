var pageMod = require('page-mod'),
    data = require('self').data,
    file = require('file'),
    url = require('url');

pageMod.PageMod({
    include: "*",
    contentScriptWhen: 'ready',
    contentScriptFile: [
        data.url('jquery-1.6.1.min.js'),
        data.url('dotjs.js')
    ],
    onAttach: function onAttach(worker) {
        worker.on('message', function(msg) {
            var domain = url.URL(msg).host,
                files, filename;
            if (domain.indexOf('www.') === 0) {
                domain = domain.substring(4, domain.length);
            }
            files = ['default', domain];
            for (var i=0; i < files.length; i++) {
                filename = '~/.js/' + files[i];
                if (file.exists(filename + '.js')) {
                    worker.postMessage({
                        js: file.read(filename + '.js')
                    });
                }
                if (file.exists(filename + '.coffee')) {
                    worker.postMessage({
                        coffee: file.read(filename + '.coffee'),
                        transpiler: data.load('coffee-script.js')
                    });
                }
            }
        });
    }
});
