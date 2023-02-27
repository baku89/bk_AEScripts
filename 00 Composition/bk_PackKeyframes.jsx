#include '../(bk_include)/common.jsx'


run( function() {

    var comp = getActiveComp();
    var layers = getSelectedLayers();    
   
    var layer = layers[0];
    var timeRemap = layer.timeRemap;

    if (timeRemap.selectedKeys.length == 0) {
		throw "No keyframe selected.";
		return;
	}
    
    var values = [];

    selectedKeys = timeRemap.selectedKeys.slice(0);
    
    for (var i = selectedKeys.length - 1; i >= 0; i--) {
        var key = selectedKeys[i];
        values.push(timeRemap.keyValue(key));
        timeRemap.removeKey(key);
    }

    values = values.reverse();

    for ( var i = 0; i < values.length; i ++ ) {
        layer.timeRemap.setValueAtTime(comp.time + comp.frameDuration * i, values[i]);
    }


    

});
