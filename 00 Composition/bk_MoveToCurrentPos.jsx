#include "../(bk_include)/common.jsx"

run( function() {

	var activeComp = getActiveComp();
	var layers = getSelectedLayers();
		
	// 1. search source property (last selected layer)
	var srcProp = layers[ layers.length - 1 ].transform.position;
	layers.splice( -1, 1 );

	if ( srcProp.selectedKeys.length == 0 ) {
		throwErrow( "No selected keys" );
		return;
	}

	// 2. ajust keyframe time
	var keys = [];
	var inTime = srcProp.keyTime( 1 );
	var originVal = srcProp.keyValue( srcProp.numKeys );
	
	for ( var i = 1; i <= srcProp.numKeys; i++ ) {
		
		var key = getKeyInfo( srcProp, i );
		key.time -= inTime;
		key.value[0] -= originVal[0];
		key.value[1] -= originVal[1];
		key.value[2] -= originVal[2];

		keys.push( key );
	}

	// 3. paste property
	var curtTime = activeComp.time;

	for ( var i = 0; i < layers.length; i++ ) {
		var dstProp = layers[ i ].transform.position;
		var dstVal = dstProp.value;

		for ( var j = 0; j < keys.length; j++ ) {
			var key = cloneKey( keys[ j ] );

			key.time += curtTime;
			key.value[0] += dstVal[0];
			key.value[1] += dstVal[1];
			key.value[2] += dstVal[2];

			setKeyInfo( dstProp, key );
		}
	}
	
});

function cloneKey( key ) {
	
	var newKey = clone( key );

	newKey.keyInTemporalEase = key.keyInTemporalEase;
	newKey.keyOutTemporalEase = key.keyOutTemporalEase;
	
	return newKey;
}	
	
function getKeyInfo( prop, index ) {

	var key = {}
	var valueType = prop.propertyValueType;

	key.time  = prop.keyTime( index );
	key.value = prop.keyValue( index );

	key.keyInInterpolationType  = prop.keyInInterpolationType( index );
	key.keyOutInterpolationType = prop.keyOutInterpolationType( index );

	if ( valueType == PropertyValueType.TwoD_SPATIAL || valueType == PropertyValueType.ThreeD_SPATIAL ) {

		key.keyInSpatialTangent  = prop.keyInSpatialTangent( index );
		key.keyOutSpatialTangent = prop.keyOutSpatialTangent( index );
		key.keySpatialContinuous = prop.keySpatialContinuous( index );
		key.keySpatialAutoBezier = prop.keySpatialAutoBezier( index );
		key.keyRoving            = prop.keyRoving( index );
	}

	key.keyInTemporalEase     = prop.keyInTemporalEase( index );
	key.keyOutTemporalEase    = prop.keyOutTemporalEase( index );
	key.keyTemporalContinuous = prop.keyTemporalContinuous( index );
	key.keyTemporalAutoBezier = prop.keyTemporalAutoBezier( index );

	return key;
}

function setKeyInfo( prop, key ) {

	var valueType = prop.propertyValueType;
	var index = prop.addKey( key.time );

	prop.setValueAtKey( index, key.value );

	if ( valueType == PropertyValueType.TwoD_SPATIAL || valueType == PropertyValueType.ThreeD_SPATIAL) {
		prop.setSpatialTangentsAtKey(   index, key.keyInSpatialTangent , key.keyOutSpatialTangent );
		prop.setSpatialContinuousAtKey( index, key.keySpatialContinuous );
		prop.setSpatialAutoBezierAtKey( index, key.keySpatialAutoBezier );
		prop.setRovingAtKey(            index, key.keyRoving );
	}

	prop.setTemporalEaseAtKey(       index, key.keyInTemporalEase, key.keyOutTemporalEase );
	prop.setTemporalContinuousAtKey( index, key.keyTemporalContinuous );
	prop.setTemporalAutoBezierAtKey( index, key.keyTemporalAutoBezier );
	
	// must set interpolation type after temporalEaseAtKey, otherwise an ease of 0 will overwrite a possible hold keyframe
	prop.setInterpolationTypeAtKey( index, key.keyInInterpolationType, key.keyOutInterpolationType );	
}