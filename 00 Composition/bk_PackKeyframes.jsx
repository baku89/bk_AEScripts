#include '../(bk_include)/common.jsx'


run( function() {

    var comp = getActiveComp();
	var layers = getSelectedLayers();
   
    var layer = layers[0];
    
    var values = [];
    
    for ( var i = layer.timeRemap.numKeys; i > 0; i-- ) {
        
        values.push( layer.timeRemap.keyValue( i ) );
    }

    for ( var i = 0; i < values.length; i ++ ) {
        layer.timeRemap.setValueAtTime( comp.frameDuration * i, values[i] );
    }


    

});
