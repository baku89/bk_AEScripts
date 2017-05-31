#include "../(bk_include)/common.jsx"

run(function() {

	var comp = getActiveComp();
	var layers = comp.selectedLayers;

	if (layers.length) {

		if (layers.length == 1) {
			app.executeCommand(-15663125);
		}

		// var sources = [];

		// layers.forEach(function(layer) {
		// 	if (layer instanceof AVLayer) {
		// 		sources.push(layer.source);

		// 		app.project.selection = app.project.selection.push(layer.source);

		// 	}
		// });

		// alert(app.project.selection.length);

	} else {
		app.executeCommand(3696);
	}

});