
const {Cc, Ci} = require('chrome'); 
const file = require('file');
const dirSvc = Cc['@mozilla.org/file/directory_service;1'].getService(Ci.nsIProperties),
homeDir = dirSvc.get('Home', Ci.nsIFile).path,
jsDir = homeDir.indexOf('/') === 0 ? '.js' : 'js',
cssDir = homeDir.indexOf('/') === 0 ? '.css' : 'css';

const data = require("self").data;

// I use these all the time...
var L = function (s) { 
	if (arguments.length > 1) {
		s = [].slice.call(arguments);
	}
	console.log(s);
};
var D = function(o) { 
	if (arguments.length > 1) {
		o = [].slice.call(arguments);
	}
	console.log(o);	
	return JSON.stringify(o, null, '    '); 
};

/**  
 * matchFile: takes the domain name and returns an object with the correct matching
 * content scripts
 */
exports.matchFile = function (domain) {

	let files = ['default', domain];

	//  our return object
	let ret = {};

	// we always load jQuery....
	ret.jquery = data.load('jquery-1.7.1.min.js');

	for (var i = files.length - 1; i >= 0; i--) {

	    let filename = file.join(homeDir, jsDir, files[i]);

	    if (file.exists(filename + '.js')) {
            ret.js = file.read(filename + '.js');
	    }

	    if (file.exists(filename + '.coffee')) {
	    	ret.transpiler = data.load('coffee-script.js');
            ret.coffee = file.read(filename + '.coffee');
	    }

	    cssname = file.join(homeDir, cssDir, files[i]);
	    if (file.exists(cssname + '.css')) {
            ret.css = file.read(cssname + '.css');
	    }
		return ret;
	}
}
