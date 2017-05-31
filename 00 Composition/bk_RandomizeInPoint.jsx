#include '../(bk_include)/common.jsx'


run( function() {

	var comp = getActiveComp();
	var frameDuration = comp.frameDuration;
	var layers = getSelectedLayers();

	var result = showDialog({
		align: {
			type: 'string',
			value: 'Add',
			label: 'Align Mode',
			dropdown: ['Add', 'Layer Range', 'Work Area', 'Current Time']
		},
		min: { type: 'number', value: 0 },
		max: { type: 'number', value: 1 }
	}, 'bk_RandomizeInPoint');


	var minFrame = +1000000000000;
	var maxFrame = -1000000000000;

	switch (result.align) {
		case 'Layer Range':
			layers.forEach(function(layer) {
				maxFrame = Math.max(maxFrame, layer.startTime / frameDuration);
				minFrame = Math.min(minFrame, layer.startTime / frameDuration);
			});
			break;

		case 'Work Area':
			minFrame = comp.workAreaStart / frameDuration;
			maxFrame = (comp.workAreaStart + comp.workAreaDuration) / frameDuration;
	}

	layers.forEach(function(layer) {

		switch (result.align) {

			case 'Current Time':
				layer.startTime = comp.displayStartTime + getRandomInt(result.min, result.max) * frameDuration;;

			case 'Add':
				layer.startTime += getRandomInt(result.min, result.max) * frameDuration;
				break;

			case 'Layer Range':
			case 'Work Area':
				layer.startTime = getRandomInt(minFrame, maxFrame) * frameDuration;
				break;
		}

	});

});


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}