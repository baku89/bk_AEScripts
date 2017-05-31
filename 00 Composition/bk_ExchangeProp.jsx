#include "../(bk_include)/common.jsx"


run( function() {

	var layers = getSelectedLayers();

	var result = showDialog({
		quantize: {type: "number", value:1}
	});
	
	if (result == null) {
		return;
	}

	targetProps = [];

	layers.forEach(function(layer) {

		var props = layer.selectedProperties;
		
		for (var j = 0; j < props.length; j++) {

				targetProps.push(props[j]);
		}  
	});

	if (targetProps.length != 2) {
		throw "Please select just 2 properties";
		return;
	}

	var propA = props[0];
	var propB = props[1];


});