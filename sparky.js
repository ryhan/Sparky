/*
 * Sparky.js
 * Super Simple Sparklines
 * Written by Ryhan Hassan
 */

var tmp = [5,6,14, 5, 10,3,4];

var SVG = {};
SVG.ns = "http://www.w3.org/2000/svg";
SVG.xlinkns = "http://www.w3.org/1999/xlink";
SVG.height = 15;
SVG.width = 100;

/*
 * dataObject definition
 * REQUIRE array of numbers
 */
function dataObject(arr){

	// Record basic attributes
	this.raw = arr;
	this.min = _.min(this.raw);
	this.max = _.max(this.raw);

	// Construct a scaling function
	var scale = _.max([Math.abs(this.min),Math.abs(this.max)]);
	this.scale = function(v){ return SVG.height - SVG.height * v / scale;};

	// Scale the data
	this.series = _.map(this.raw, this.scale);

}


/* 
 * Sparkline SVG generator
 * REQUIRE dataObject
 */
function sparkLine(data){

	// Create the path to append
	var path = document.createElementNS(SVG.ns, "path");

	// Construct a set of coordinates
	var xAxis = data.series,
		yAxis = _.range(0, SVG.width, SVG.width /xAxis.length);

	// Generate the line to plot
	var pathd = _.map(_.zip(yAxis, xAxis), function(v){
			return ["L", v[0], v[1]].join(' ');
		}).join(' ');

	// Construct the path d attribute
	path.setAttribute('d', 
		[	'M', '0', SVG.height, 
			pathd, 
			'L', SVG.width, SVG.height, 
			'Z'
		].join(' '));

	path.setAttribute('fill', 'steelblue');

	document.getElementById('sparky').appendChild(path);
}