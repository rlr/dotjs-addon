dotjs
=====

This is a Firefox Add-on port of defunkt's Chrome extension <https://github.com/defunkt/dotjs>.

dotjs is a Firefox Add-on that executes JavaScript and CoffeeScript files in `~/.js` based on their filename and the domain of the site you are visiting.

If you navigate to `http://www.google.com/`, dotjs will execute `~/.js/google.com.js` and/or `~/.js/google.com.coffee`. If you have a `~/.js/default.js`, it will execute on every page you visit. Also, you can put site specific .css files in `~/.css` (`C:\Users\<username>\css\.` in Windows 7). `default.css` loads in all sites.

This makes it super easy to spruce up your favorite pages using JavaScript and CSS.

Bonus:  files in `~/.js` have jQuery 1.7.1 loaded, regardless  of  whether  the  site  you're  hacking uses jQuery.

GreaseMonkey user scripts are great, but you need to publish them somewhere and re-publish after making modifications. With dotjs, just add or edit files in `~/.js`.

# Example

    $ cat ~/.js/github.com.js
    // swap github logo with trollface
    $('#header .site-logo img')
    .css('width', '100px')
    .css('margin-top', '-15px')
    .attr('src', 'https://img.skitch.com/20110207-x4s8eys3uy641yk72jigt38bby.png');

![](https://dl.dropbox.com/u/361064/dotjs.png)

# How to target a specific path

Sometimes, you don’t want to target a whole domain, but only a path.

## CSS

You can use the `@-moz-document` Mozilla Extension:

    /* Full path */
    @-moz-document url-prefix(http://www.w3.org/Style/) {
        /* CSS here */
    }

    /* Regex */
    @-moz-document regexp("^https?:\/\/www\.w3\.org\/Style\/.*") {
        /* CSS here */
    }

Documentation: https://developer.mozilla.org/en/CSS/@-moz-document

## JavaScript

You can test the `window.location` object:

    // Search for a string
    if (window.location.pathname.indexOf('/Style/') === 0) {
        // JS here
    }

    // Regex
    if (/^\/Style\/.*/.test(window.location.pathname)) === 0) {
        // JS here
    }

Documentation: https://developer.mozilla.org/en/DOM/window.location

# Installation

- You can install from Mozilla Add-ons site: <https://addons.mozilla.org/en-US/firefox/addon/dotjs/>
- Or from source. Refer to the Add-on SDK Docs: <https://jetpack.mozillalabs.com/sdk/latest/docs/>

# Dependencies

- addon-sdk: <https://github.com/mozilla/addon-sdk/>

# Contributors (Thank you!)

- djl: <https://github.com/djl>
- tdolsen: <https://github.com/tdolsen>


# Changelog
v1.2: Updated to jQuery 1.7.1 and some cleanup (Thanks djl!).

v0.9: CSS support!

v0.8: Windows support! Put your scripts in a `js` folder under your home directory (`C:\Users\<username>\js\.` in Windows 7).

v0.7: CoffeeScript support! `~/.js/example.com.coffee` gets transpiled to JavaScript and executed.

## Credits

- defunkt: <https://github.com/defunkt/dotjs>
- jQuery: <http://jquery.com/>
- Ryan Tomayko for:

> "I almost wish you could just stick JavaScript in ~/.js. Do you know what I'm saying?"
