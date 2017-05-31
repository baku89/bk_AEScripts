#include "../(bk_include)/common.jsx"





run( function() {

	var layers = getSelectedLayers();




	layers.forEach(function(layer) {

		if (!layer instanceof ShapeLayer) {
			return;
		}

		searchShape(layer.content);

	});


	function searchShape(group) {

		if (group.constructor.name !== "Property") {
			writeLn(group.type + " " + group.name);
		}
		

		if (group instanceof PropertyGroup) {
			

			for (var i = 1; i <= group.numProperties; i++) {
				searchShape(group(i));
			}

		} else {

			// writeLn(group.constructor.name + " " + group.name);
		}

	}

});
