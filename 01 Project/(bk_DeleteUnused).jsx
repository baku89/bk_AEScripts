#include "../(bk_include)/common.jsx"


run( function() {

	var items = getSelectedItems();

	items.forEach(function(item) {


			if (item.typeName == "Footage") {
				if (item.usedIn == 0) {
					item.remove();
				}
			}

	});
});