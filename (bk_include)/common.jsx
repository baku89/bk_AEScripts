#include "../(bk_include)/polyfill.jsx"
#include "../(bk_include)/dialog.jsx"
#include "../(bk_include)/progress-window.jsx"

//------------------------------------------------------
// util

function run(main) {

	try {
		app.beginUndoGroup( "Do Script" );
		main();
		app.endUndoGroup();
	} catch ( err ) {
		alert( "[ERROR] " + err );
	}
}

function log( data ) {
	writeLn( JSON.stringify( data ) );
}

function clone( data ) {
	return JSON.parse( JSON.stringify( data ) );
}

function throwError( msg ) {
	alert( msg || "An error occured" );
}

function getBasename(filename) {

	var base = filename.substr(filename.lastIndexOf('/') + 1);

	base = base.substr(0, base.lastIndexOf('.'));

	alert(base);

}

//------------------------------------------------------
// Timeline

function getSelectedLayers() {
	var activeComp = getActiveComp();
	var layers = activeComp.selectedLayers;

	if ( layers.length ) {
		return layers;
	} else {
		throw "No layer selected";
	}
}

function getSelectedProperties() {

	var layers = getSelectedLayers();

	var props = []

	layers.forEach(function(layer) {
		layer.selectedProperties.forEach(function(prop) {
			props.push(prop);
		});
	});

	if (props.length) {
		return props;
	} else {
		throw "No property selected"
	}
}


function getPropertyDimension(prop, layer) {

	var type = prop.propertyValueType;
	var dim = 0;

	if (type == PropertyValueType.ThreeD_SPATIAL ||
		type == PropertyValueType.ThreeD) {

		dim = 3;

	} else if ( type == PropertyValueType.TwoD_SPATIAL ||
		type == PropertyValueType.TwoD) {
		
		dim = 2;
			
	} else if (type == PropertyValueType.OneD) {

		dim = 1;
	}

	if (!layer.threeDLayer) {
		if (prop == layer.transform.position ||
			prop == layer.transform.scale ||
			prop == layer.transform.anchorPoint) {
			dim = 2;
		}
	}

	return dim;
}

//------------------------------------------------------
// Project Panel


function getSelectedItems(recursive) {

	if (app.project.selection) {

		if (recursive) {

			// search all children without duplication
			var itemsArray = [];
			var addToList = function(item) {
				if (itemsArray.indexOf(item) == -1) {
					itemsArray.push(item);
				}
				if (item instanceof FolderItem) {
					item.items.forEach(addToList);
				}
			}
			app.project.selection.forEach(addToList);

			// create ItemCollection
			// var items = ItemCollection();
			// itemsArray.forEach(function(item) {
			// 	items.add(item);
			// });

			return itemsArray;

		} else {

			return app.project.selection;

		}

	} else {

		throw "No Item Selected";

	}
}


function getActiveComp() {
	var activeComp = app.project.activeItem;

	if ( activeComp && ( activeComp instanceof CompItem ) ) {
		return activeComp;
	} else {
		throw "No comp selected";
	}
}


function getItemByNameAndType(name, type) {
	var targetItem = null;

	for (var i = 1; i <= app.project.numItems; i ++) {
    if ((app.project.item(i).typeName == type) && (app.project.item(i).name === name)) {
      if (targetItem) {
        throw "There are multiple items with same name";
      }
      targetItem = app.project.item(i);
    }
	}
	return targetItem;
}

function getItemByName(name) {
	var targetItem = null;

	for (var i = 1; i <= app.project.numItems; i ++) {
    if (app.project.item(i).name === name) {
      if (targetItem) {
        throw "There are multiple items with same name";
      }
      targetItem = app.project.item(i);
    }
	}
	return targetItem;
}


function mergeSource(origin, copy) {	
	var compList = copy.usedIn;
    
	compList.forEach(function(comp) {
		if (comp != origin) {
			comp.layers.forEach(function(layer, i) {
				if (layer.source == copy) {
					layer.replaceSource(origin, true);
				}
			});
		}
	});
}