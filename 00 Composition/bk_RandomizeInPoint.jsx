#include "../(bk_include)/common.jsx"

run( function() {

	var comp = getActiveComp();
	var layers = getSelectedLayers();

	var params = {
		min: { type: "number", value: 0 },
		max: { type: "number", value: 1 }
	}

	var dialog = new Dialog( params );
    var result = dialog.show();

	if ( result !== null ) {w
    
    	// modify

    	for ( var i = 0; i < layers.length; i++ ) {
    		var layer = layers[i];

            layer.startTime += comp.frameDuration * getRandomInt( result.min, result.max );
    	}
        
    }
} );


function getRandomInt( min, max ) {
	return Math.floor( Math.random() * (max-min+1) ) + min;
}