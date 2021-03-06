#include '../(bk_include)/common.jsx'

run( function() {

	var comp = getActiveComp();
	var layers = getSelectedLayers();

	var result = showDialog({
		useFixedStep: {type: 'boolean', label: 'Use Fixed Step', value: true},
		step: {type: 'number', label: 'Step', value: 1},
	}, 'bk_SequenceLayers');	

  if (result == null) {
  	return;
  }
    
  // get sequence in-point based on 1st selected layer
  var targetInPoint = layers[0].inPoint;

  // shift layers
	layers.forEach(function(layer, i) {
		
		layer.startTime += targetInPoint - layer.inPoint

		targetInPoint += (result.useFixedStep)
			? result.step * comp.frameDuration
			: layer.outPoint - layer.inPoint;
	});
	
});