var pageMod = require('page-mod'),
    data = require('self').data,
    file = require('file'),
    url = require('url'),
    {Cc, Ci} = require('chrome');


/*
 * 
 */
var tabs = require("tabs");

tabs.on('ready', function(tab) {
    // test for the worker as a property of the tab object.
    if (typeof(tab._dotjs_worker) === 'undefined') {
        let worker = tab.attach({
            contentScriptFile: [data.url('jquery-1.7.1.min.js'), data.url('dotjs.js')]
        });

        worker.on('message', function(msg) {
            var domain = url.URL(msg).host,
                dirSvc = Cc['@mozilla.org/file/directory_service;1']
                    .getService(Ci.nsIProperties),
                homeDir = dirSvc.get('Home', Ci.nsIFile).path,
                jsDir = homeDir.indexOf('/') === 0 ? '.js' : 'js',
                cssDir = homeDir.indexOf('/') === 0 ? '.css' : 'css',
                files, filename;
            if (domain.indexOf('www.') === 0) {
                domain = domain.substring(4, domain.length);
            }

            files = ['default', domain];
            for (var i=0; i < files.length; i++) {
                filename = file.join(homeDir, jsDir, files[i]);
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
                cssname = file.join(homeDir, cssDir, files[i]);
                if (file.exists(cssname + '.css')) {
                    worker.postMessage({
                        css: file.read(cssname + '.css')
                    });
                }
            }
        });
        // later, add the worker as a property od the tab object, so we don't inject
        // the tab more than once.
        tab._dotjs_worker = worker;
    }
});
