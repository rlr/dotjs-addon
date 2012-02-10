var tabs = require('tabs'),
    data = require('self').data,
    file = require('file'),
    url = require('url'),
    {Cc, Ci} = require('chrome'),
    dirSvc = Cc['@mozilla.org/file/directory_service;1']
            .getService(Ci.nsIProperties),
    homeDir = dirSvc.get('Home', Ci.nsIFile).path,
    jsDir = homeDir.indexOf('/') === 0 ? '.js' : 'js',
    cssDir = homeDir.indexOf('/') === 0 ? '.css' : 'css',
    contentScriptFiles = [data.url('jquery-1.7.1.min.js'), data.url('dotjs.js')];

tabs.on('ready', function(tab) {
    var domain = url.URL(tab.url).host,
        filesToAttach = [],
        baseFilenames, filename;

    if (!domain) {
        return;
    }

    if (domain.indexOf('www.') === 0) {
        domain = domain.substring(4, domain.length);
    }

    baseFilenames = ['default', domain];

    // Look for files to add to the page in the tab.
    for (var i = 0; i < baseFilenames.length; i++) {
        filename = file.join(homeDir, jsDir, baseFilenames[i]);
        if (file.exists(filename + '.js')) {
            filesToAttach.push({type: 'js', filename: filename + '.js'});
        }
        if (file.exists(filename + '.coffee')) {
            filesToAttach.push({type: 'coffee', filename: filename + '.coffee'});
        }
        cssname = file.join(homeDir, cssDir, baseFilenames[i]);
        if (file.exists(cssname + '.css')) {
            filesToAttach.push({type: 'css', filename: cssname + '.css'});
        }
    }

    // Only attach the contentScriptFiles if there are user scripts to attach.
    if (filesToAttach.length) {
        let worker = tab.attach({
            contentScriptFile: contentScriptFiles
        });

        worker.on('message', function(msg) {
            var msg;
            for (var i = 0; i < filesToAttach.length; i++) {
                filename = filesToAttach[i];
                msg = {};
                msg[filename.type] = file.read(filename.filename);
                if (filename.type === 'coffee') {
                    msg['transpiler'] = data.load('coffee-script.js')
                }
                worker.postMessage(msg);
            }
        });
    }
});
