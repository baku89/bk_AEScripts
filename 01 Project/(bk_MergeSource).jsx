#include "../(bk_include)/common.jsx"

function hashItem (item) {
	var source = item.mainSource;
	var attr;

	if (source instanceof SolidSource) {

		attr = [
			"solid",
			item.width,
			item.height,
			source.color.join(':'),
		];

	} else if (source instanceof FileSource) {

		attr = [
			"file",
			source.file.fullName,
			source.displayFrameRate,
			source.alphaMode
		];

	}

	return attr != undefined ? attr.join('-') : null;
}

function convertToHex(color) {
	var hexList = [];
	color.forEach(function(c) {
		var hex = Math.floor(c * 0xff).toString(16);
		hex = (hex.length == 1) ? "0" + hex : hex;
		hexList.push(hex);
	});

	return "#" + hexList.join('').toUpperCase();
}

function standarizeName(item) {
	var source = item.mainSource;
	var name;

	if (source instanceof SolidSource) {
		var hex = convertToHex(source.color);

		if (item.width == 100 && item.height == 100 && hex == '#FFFFFF') {
			name = 'Null';
		} else {
			name = 'Solid-' + hex + '-' + item.width + 'x' + item.height;
		}
	}

	item.name = name;

}

// function isEmptyFolder(folder) {
// 	var result = true;
// 	// folder.items.forEach(function(item) {
// 	// 	if (item instanceof FolderItem) {
// 	// 		result = isEmptyFolder(item);
// 	// 	} else {
// 	// 		result = false;
// 	// 	}
// 	// });
// 	return result;
// }

run( function() {

	var items = getSelectedItems(true);
	var srcList = {};
	var srcCount = 0;
	var removeList = [];

	var progress = new ProgressWindow();

	items.forEach(function(item, i) {

		$.writeln(item.name);
		progress.update(i / items.length, item.name);

		if (item instanceof FootageItem) {

			// if item is not used then remove
			if (item.usedIn.length == 0) {
				removeList.push(item);
			}

			// add to list and detect deplicated
			var key = hashItem(item);
			if (key != null) {
				if (srcList[key] == undefined) {
					srcList[key] = item;
					standarizeName(item);
					srcCount++
				} else {
					// merge same source
					mergeSource(srcList[key], item);
					item.remove();
				}
			}

		} else if (item instanceof FolderItem) {

			// if (isEmptyFolder(item)) {
			// 	removeList.push(item);
			// }
		}

	});

	// then remove all items which not used
	removeList.forEach(function(item) {
		item.remove();
	});
});