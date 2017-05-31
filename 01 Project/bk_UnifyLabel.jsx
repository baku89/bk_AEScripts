#include "../(bk_include)/common.jsx"

run( function() {

	var items = getSelectedItems(true);

	items.forEach(function(item, i) {

		if (item instanceof FootageItem || item instanceof CompItem) {

			item.usedIn.forEach(function(comp) {

				// search used layer
				comp.layers.forEach(function(layer) {
					if (layer.source == item) {
						layer.label = item.label;
					}
				});

			});

		}
	});
});