#include "../(bk_include)/common.jsx"


function getSelectedItems() {

	if ( app.project.selection ) {
		return app.project.selection;
	} else {
		throw "No Item Selected";
	}
}


run( function() {

	var items = getSelectedItems();
   
	var params = {
		find: { type: "string", value: items[ 1 ].name },
		replace: { type: "string", value: "" }
	}

	var dialog = new Dialog( params );
	var result = dialog.show();

	if ( result !== null ) {
		
		for ( var i = 0; i < items.length; i++ ) {	
			items[i].name = items[ i ].name.replace( result.find, result.replace );
		}

	}

});
