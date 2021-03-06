#include '../(bk_include)/common.jsx'


run( function() {
	
	var result = showDialog({
		easeOut: {type: 'number', label: 'Ease Out', value: 0.1, min: 0.1, max: 100},
		easeIn:  {type: 'number', label: 'Ease In',  value: 100, min: 0.1, max: 100},
		roving:  {type: 'boolean', label: 'Enable Roving', value: true}
	}, 'bk_EasyEase');

    log(result);
 
	if (result == null) {
		return;
	}

	var easeOut = new KeyframeEase(0, result.easeOut);
	var easeIn = new KeyframeEase(0,  result.easeIn);

	var props = getSelectedProperties();

	props.forEach(function(prop) {


		if (prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup) {
			return;
		}
		
		var keyNum = prop.selectedKeys.length;

		if (keyNum < 2) {
			return;
		}



		var easeInArr, easeOutArr;

		switch (prop.propertyValueType) {
			case PropertyValueType.ThreeD:
				easeOutArr = [easeOut, easeOut, easeOut];
				easeInArr  = [easeIn, easeIn, easeIn];
				break;
			case PropertyValueType.TwoD:
				easeOutArr = [easeOut, easeOut];
				easeInArr  = [easeIn, easeIn];
				break;
			default:
				easeOutArr = [easeOut];
				easeInArr  = [easeIn];
				break;
		}


		prop.selectedKeys.forEach(function(key, i) {


			// if (!result.roving) {
			// 	prop.setRovingAtKey(key, false);
			// }
   //          alert('aa');
			
			if (!result.roving || i == 0) {
				var thisEaseIn = prop.keyInTemporalEase(key);
				prop.setTemporalEaseAtKey(key, thisEaseIn, easeOutArr);
			}

			if (!result.roving || i == keyNum - 1) {
				var thisEaseOut = prop.keyOutTemporalEase(key);
				prop.setTemporalEaseAtKey(key, easeInArr, thisEaseOut);
			}
				
			if (result.roving && (0 < i && i < keyNum - 1)) {
				prop.setRovingAtKey(key, true);
			}
		});

	});

});