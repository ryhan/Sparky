/*
 * Sparky.js
 * Super Simple Sparklines
 * Written by Ryhan Hassan
 */

var sparky = (	
function(){

	// Generates a sparkline SVG
	var sparkline = function(list, attr)
	{
		// Raw supplied data
		this.list = list;
		this.attr = attr;

		// Returns true if a value is defined
		var defined = function(v){ return (v!=undefined && v!='');};

		// Define SVG attributes
		this.SVG = {};
		this.SVG.ns 	 = "http://www.w3.org/2000/svg";
		this.SVG.xlinkns = "http://www.w3.org/1999/xlink";
		this.SVG.height  = (defined(attr.height))?  attr.height: 15;
		this.SVG.width   = (defined(attr.width))?   attr.width:  50;
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
		var scale = (this.data.max - this.data.min);
		this.data.scale = function(v){ return this.SVG.height * (1 - (v - this.data.min)/scale);};
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
	};

	// Update cycle
	var fetch = function()
	{
		var sparklines = $(':not([data-sparkline==""]');
		_.map(sparklines, function(element)
		{	
			// Pull out and sanitize the list data
			var list = element.getAttribute('data-sparkline')
			list = _.compact(_.map(list.replace(/ /g, '').split(','), Number));

			// Handle any additional data attributes
			var attr = {
				bgcolor: element.getAttribute('data-sparkline-bgcolor'),
				height: element.getAttribute('data-sparkline-height'),
				width: element.getAttribute('data-sparkline-width'),
			}

			// Attach the new SVG to the parent elemtn
			if (list.length > 0)
			{
				var svg = sparkline(list, attr);
				element.innerHTML = "";
				element.appendChild(svg);
			}
			return true;
		})
	};

	// Publicly accessible functions
	return {fetch: fetch};

})();
