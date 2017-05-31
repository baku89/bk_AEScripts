#include "../(bk_include)/common.jsx"

// 最初に消しちゃいたいやつを選択して, 次に統合先を選択


run( function() {

	var items = getSelectedItems();

	if (items.length != 2) {
		throw "You have to select replacing item at first, then target item.";
	}

	var copy = items[0];
	var origin = items[1];

	mergeSource(origin, copy);
   
});