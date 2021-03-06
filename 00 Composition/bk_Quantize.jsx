#include '../(bk_include)/common.jsx'


run( function() {

	var layers = getSelectedLayers();

	var result = showDialog({
		quantize: {type: 'number', label: 'Quantize Step', value: 1}
	}, 'bk_Quantize');
	
	if (result == null) {
		return;
	}

	layers.forEach(function(layer) {

		var props = layer.selectedProperties;
		
		for (var j = 0; j < props.length; j++) {

			var prop = props[j];

			if (!prop.canSetExpression) {
				continue;
			}

			var dim = getPropertyDimension(prop, layer);

			switch (dim) {
				case 1:
					prop.expression =
						'var q = ' + result.quantize + ';\n' +
						'Math.round(value / q) * q;'
					break;
				case 2:
					prop.expression = 
						'var q = ' + result.quantize + ';\n' +
						'[Math.round(value[0]/q)*q, Math.round(value[1]/q)*q]';
					break;
				case 3:
					prop.expression =
						'var q = ' + result.quantize + ';\n' +
						'[Math.round(value[0]/q)*q, Math.round(value[1]/q)*q, Math.round(value[2]/q)*q]';
					break;
			} 
		}  

	});
});