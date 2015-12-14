const {Cc, Ci} = require('chrome');
const data = require("sdk/self").data;
const file = require('sdk/io/file');
const dirSvc = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties),
homeDir = dirSvc.get('Home', Ci.nsIFile).path,
jsDir = homeDir.indexOf('/') === 0 ? '.js' : 'js';
cssDir = homeDir.indexOf('/') === 0 ? '.css' : 'css';

// pre-load out helper scripts
var jquery = false;
var coffeescript = false;

/**
 * matchFile: takes the domain name and returns an object with the correct matching
 * content scripts
 */
exports.matchFile = function (domain) {
    /*
     * This is a problem - if the user has a default.js/css file,  we will always inject
     * causing a bunch of overhead for each tab.
     */
    let files = ['default', domain];

    //  our return object
    let ret = {
        match: false,
        js: [],
        coffee: [],
        css: []
    };

    let jsmatch = false;

    files.forEach(function(filename) {
        let jspath = file.join(homeDir, jsDir, filename);

        if (file.exists(jspath + '.js')) {
            ret.js.push(file.read(jspath + '.js'));
            jsmatch = true;
            ret.match = true;
        }

        if (file.exists(jspath + '.coffee')) {
            if (coffeescript === false)
                coffeescript = data.load('coffee-script.js');
            ret.transpiler = coffeescript;
            ret.coffee.push(file.read(jspath + '.coffee'));
            jsmatch = true;
            ret.match = true;
        }

        let csspath = file.join(homeDir, cssDir, filename);
        if (file.exists(csspath + '.css')) {
            ret.css.push(file.read(csspath + '.css'));
            ret.match = true;
        }
    });

    // we always load jQuery if there is a JS match.
    if (jsmatch === true) {
        if (jquery === false) {
            jquery = data.load('jquery-1.9.0.min.js');
        }
        ret.jquery = jquery;
    }

    return ret;
}
