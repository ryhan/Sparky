Sparky.js
=========

Sparky is a simple way to create sparklines, created and maintained by [Ryhan Hassan](http://github.com/ryhan).

Getting Started
---------------
[Download the latest release](https://github.com/ryhan/sparky/zipball/master) which provides a demo HTML file, sparky.js, underscore.js, and jQuery.

Usage
-----
* Add `data-sparkline="1,2,3"` to an element, where "1,2,3" can be any series of numbers. It is recommended to use a `<span>` element for this.
* (Optional) Set `data-sparkline-width` and `data-sparkline-height` to be some integer representing the pixel width and height of the sparkline.
* (Optional) Set `data-sparkline-bgcolor`to be some string representing the color code of the background of the sparkline. 
* Call `sparky.fetch();` to render sparklines.