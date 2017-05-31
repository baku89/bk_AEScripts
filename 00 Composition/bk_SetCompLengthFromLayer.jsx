#include "../(bk_include)/common.jsx"

run(function() {

	// var params = {
	// 	extendOtherLayer: {type: "boolean", value: "true"}
	//  }

	// var dialog = new Dialog(params);
	// var result = dialog.show();

	// if (result == null) {
	// 	return;
	// }

	var comp = getActiveComp();
	var layers = getSelectedLayers()[0];
  // var duration = baseLayer.source.duration;

  var startTime = Number.MAX_VALUE;
  var endTime = Number.MIN_VALUE;
  var duration = 0;

  getSelectedLayers().forEach(function(layer) {

    if (layer.duration == 0) {
      throw "Layer source's duration is zero";
    }
    if (layer.timeRemapEnabled) {
      throw "TimeRemap Enabled";
    }

    startTime = Math.min(startTime, layer.startTime);
    endTime = Math.max(endTime, layer.startTime + layer.source.duration);
    duration = endTime - startTime;

  });

  var extendIn = -startTime;
  var extendOut = (startTime + duration) - comp.duration;

  // save if each layers have to be extended
  var inLayers = [], outLayers = [];
  comp.layers.forEach(function(layer) {
  	if (layer.inPoint <= 0) {
  		inLayers.push(layer);
  	}
  	if (layer.outPoint >= comp.duration - comp.frameDuration) {
  		outLayers.push(layer);
  	}
  });

  // change duration
  comp.duration = duration;

  // shift all layers
  comp.layers.forEach(function(layer) {
  	layer.startTime += extendIn;
	});
  
  // extend layer in-out point if needed
  inLayers.forEach(function(layer) {
  	layer.inPoint = 0;
  });
  outLayers.forEach(function(layer) {
  	layer.outPoint = comp.duration;
  });

});