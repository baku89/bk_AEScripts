#include "../(bk_include)/common.jsx"

run( function() {

	var layers = getSelectedLayers();

	for ( var i = 1; i < layers.length; i++ ) {

		var child = layers[i];
		var parent = layers[i-1];

		child.setParentWithJump( parent );
	}

} );


function getRandomInt( min, max ) {
	return Math.floor( Math.random() * (max-min+1) ) + min;
}