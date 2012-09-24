/*
 * Sparky.js
 * Super Simple Sparklines
 * Written by Ryhan Hassan
 */

var tmp = [40, 60, 45, 50, 23, 10, 30, 15, 18, 10, 50];

var attr = {
	/*
	bgcolor: '#FFF',
	height: 25,
	width: 50
	*/
}

function sparkline(list, attr)
{
	// Raw supplied data
	this.list = list;

	// Raw attribute object
	this.attr = attr;

	// Returns true if a value is defined
	var defined = function(v){ return (v!=undefined && v!='');};

	// Define SVG attributes
	this.SVG = {};
	this.SVG.ns 	 = "http://www.w3.org/2000/svg";
	this.SVG.xlinkns = "http://www.w3.org/1999/xlink";
	this.SVG.height  = (defined(attr.height))?  attr.height: 25;
	this.SVG.width   = (defined(attr.width))?   attr.width:  75;
	this.SVG.bgcolor = (defined(attr.bgcolor))? attr.bgcolor: '#F0F0F0'; 
	this.SVG.fill 	 = 'white';
	this.SVG.stroke  = (_.first(this.list) > _.last(this.list))? 'red': 'steelblue';
	this.SVG.weight  = 1;

	// Construct the SVG
	var svg = document.createElementNS(SVG.ns, "svg");
	svg.style.backgroundColor = this.SVG.bgcolor;
	svg.style.height = this.SVG.height + 'px';
	svg.style.width = this.SVG.width + 'px';

	// Evaluate basic data attributes
	this.data = {};
	this.data.min = _.min(this.list);
	this.data.max = _.max(this.list);
	var scale = _.max([Math.abs(this.data.min), Math.abs(this.data.max)]);
	this.data.scale = function(v){ return this.SVG.height * (1 - v/scale);};
	this.data.series = _.map(this.list, this.data.scale);

	// Manipulate the set of coordinates
	var yAxis = this.data.series;
	var xIndex = function(v,i){return this.SVG.width * i / yAxis.length;};
	var xAxis = _.map(yAxis, xIndex);
	xAxis = _.map(xAxis, Math.round);
	yAxis = _.map(yAxis, Math.round);
	var axisPairs = _.zip(xAxis, yAxis);

	// Evaluate the d path attribute
	var moveTo = function(a){ return ["L", a[0], a[1]].join(' ');};
	var lineArray = _.map(axisPairs, moveTo);
	lineArray = lineArray.concat(_.clone(lineArray).reverse());
	var d = [ 'M', _.first(xAxis), _.first(yAxis), lineArray.join(' '), 'Z'].join(' ');

	// Construct the path
	var path = document.createElementNS(SVG.ns, "path");
	path.setAttribute('d', d);
	path.setAttribute('fill', this.SVG.fill);
	path.setAttribute('stroke', this.SVG.stroke);
	path.setAttribute('stroke-width', this.SVG.weight);
	svg.appendChild(path);

	return svg;
}


var SVG = {};
SVG.ns = "http://www.w3.org/2000/svg";
SVG.xlinkns = "http://www.w3.org/1999/xlink";
SVG.height = 25;
SVG.width = 75;

/*
 * dataObject definition
 * REQUIRE array of numbers
 */
function dataObject(arr)
{
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

function pathGen(attr)
{
	// Create the path to append
	var path = document.createElementNS(SVG.ns, "path");

	path.setAttribute('d', attr.d);
	path.setAttribute('fill', attr.fillColor);
	path.setAttribute('stroke', attr.strokeColor);
	path.setAttribute('stroke-width', attr.strokeWeight);

	document.getElementById('sparky').appendChild(path);
}


/* 
 * Sparkline SVG generator
 * REQUIRE dataObject
 */
function sparkLine(data){

	// Create the path to append
	var path = document.createElementNS(SVG.ns, "path");
	var container = document.createElementNS(SVG.ns, "svg");


	// Construct a set of coordinates
	var yAxis = data.series,
		xAxis = _.map(yAxis, function(v,i){ 
			return SVG.width * i/ yAxis.length;});

	yAxis = _.map(yAxis, Math.round);
	xAxis = _.map(xAxis, Math.round);
	
	var fillColor = (yAxis[0] > yAxis[yAxis.length - 1])?'steelblue':'red',
		strokeColor = fillColor,
		strokeWeight = 1;

	var moveTo = function(a){ return ["L", a[0], a[1]].join(' ');};
	var lineArray = _.map(_.zip(xAxis, yAxis), moveTo);
	lineArray = lineArray.concat(_.clone(lineArray).reverse());

	// Evaluate the d path attribute
	var d = [	'M', xAxis[0], yAxis[0],
				lineArray.join(' '), 
				'Z'
			].join(' ');

	path.setAttribute('d', d);
	path.setAttribute('fill', fillColor);
	path.setAttribute('stroke', strokeColor);
	path.setAttribute('stroke-width', strokeWeight);

	container.appendChild(path);
	document.body.appendChild(container);

	//document.getElementById('sparky').appendChild(path);
}