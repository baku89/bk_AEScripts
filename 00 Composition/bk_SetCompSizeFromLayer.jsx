#include "../(bk_include)/common.jsx"

run(function() {

	var comp = getActiveComp();
	var layers = getSelectedLayers();

  if (layers.length != 1) {
    throw "Select only one layer";
  }

  var layer = layers[0]
  var source = layers[0].source;

  comp.width = source.width;
  comp.height = source.height;

});