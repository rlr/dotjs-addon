dotjs
=====

This is a Firefox Add-on port of defunkt's Chrome extension <https://github.com/defunkt/dotjs>.

dotjs is a Firefox Add-on that executes JavaScript files in `~/.js` based on their filename and the domain of the site you are visiting.

If you navigate to `http://www.google.com/`, dotjs will execute `~/.js/google.com.js`.

This makes it super easy to spruce up your favorite pages using JavaScript.

Bonus:  files in `~/.js` have jQuery 1.6.1 loaded, regardless  of  whether  the  site  you're  hacking uses jQuery.

New in v0.7: CoffeeScript support! `~/.js/example.com.coffee` gets transpiled to JavaScript and executed.

GreaseMonkey user scripts are great, but you need to publish them somewhere and re-publish after making modifications. With dotjs, just add or edit files in `~/.js`.

## Example

    $ cat ~/.js/github.com.js
    // swap github logo with trollface
    $('#header .logo img')
      .css('width', '100px')
      .css('margin-top', '-15px')
      .attr('src', '//bit.ly/ghD24e')

![](https://dl.dropbox.com/u/361064/dotjs.png)

## Installation

- You can install from Mozilla Add-ons site: <https://addons.mozilla.org/en-US/firefox/addon/dotjs/>
- Or from source. Refer to the Add-on SDK Docs: <https://jetpack.mozillalabs.com/sdk/latest/docs/>

## Dependencies

- addon-sdk: <https://github.com/mozilla/addon-sdk/>

## Tested in

- Firefox 4, 5, 6

## Contributors (Thank you!)

- xvzf: <https://github.com/xvzf>

## Credits

- defunkt: <https://github.com/defunkt/dotjs>
- jQuery: <http://jquery.com/>
- Ryan Tomayko for:

> "I almost wish you could just stick JavaScript in ~/.js. Do you know what I'm saying?"
