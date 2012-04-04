const {Cc, Ci} = require('chrome'); 
const data = require("self").data;
const file = require('file');
const dirSvc = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties),
homeDir = dirSvc.get('Home', Ci.nsIFile).path,
jsDir = homeDir.indexOf('/') === 0 ? '.js' : 'js';
cssDir = homeDir.indexOf('/') === 0 ? '.css' : 'css';

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
	let ret = {match: false};

	let jsmatch = false;

	for (var i = files.length - 1; i >= 0; i--) {
	    let filename = file.join(homeDir, jsDir, files[i]);

	    if (file.exists(filename + '.js')) {
            ret.js = file.read(filename + '.js');
            jsmatch = true;
            ret.match = true;
	    }

	    if (file.exists(filename + '.coffee')) {
	    	ret.transpiler = data.load('coffee-script.js');
            ret.coffee = file.read(filename + '.coffee');
            jsmatch = true;
            ret.match = true;
	    }

	    let cssname = file.join(homeDir, cssDir, files[i]);
	    if (file.exists(cssname + '.css')) {
            ret.css = file.read(cssname + '.css');
            ret.match = true;
	    }
	}

	// we always load jQuery is there is a JS match.
	if (jsmatch === true)
		ret.jquery = data.load('jquery-1.7.1.min.js');

	return ret;
}
