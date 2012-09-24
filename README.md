Sparky.js
=========

Sparky is a simple way to create sparklines, created and maintained by [Ryhan Hassan](http://github.com/ryhan).

Getting Started
---------------
[Download the latest release](https://github.com/ryhan/sparky/zipball/master) which provides a demo HTML file, sparky.js, underscore.js, and jQuery.

Usage
-----

#### Add the data-sparkline attribute
Add `data-sparkline="1,2,3"` to an element, where "1,2,3" can be any series of numbers.

#### Call Sparky.fetch()
Next, call `sparky.fetch();` to render sparklines.

To adjust the appearance of the rendered sparkline, use one of these optional additional data attributes.
* `data-sparkline-bgcolor` expects a string representing background color.
* `data-sparkline-width` expects an integer representing pixel width.
* `data-sparkline-height` expects an integer representing pixel height.