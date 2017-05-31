#include "../(bk_include)/common.jsx"

function getChildren(folder) {
	var children = [];
	folder.items.forEach(function(item) {
		if (item instanceof FolderItem) {
			children.push.apply(children, getChildren(item));
		} else {
			children.push(item);
		}
	});
	return children;
}

//----------------------------------------
// main


run(function() {

	var branch = getSelectedItems()[0];
	var progress = new ProgressWindow();

	if (!(branch instanceof FolderItem && (branch.name.endsWith('.aep') || branch.name.endsWith('.aepx')))) {
		throw 'Import AEP file and then select added folder ends with ".aep(x)"" in Project Panel';
	}

	if (!confirm('念のため今のプロジェクトファイルバックアップお願いします!  続行しますか?')) {
		return;
	}

	progress.update(0, 'Searching branch items..');

	// search duplicated layers
	var master = app.project.rootFolder;
	var branchChildren = getChildren(branch);

	branchChildren.forEach(function(branchItem, i) {

		progress.update(i / branchChildren.length, 'Merging.. ' + branchItem.name);


		if (branchItem.usedIn.length == 0) {
			
			var name = branchItem.name;

			// add "[branch]" branch's name to avoid conflicting
			branchItem.name += '[branch]';
			
			// search master item
			var masterItem = getItemByNameAndType(name, branchItem.typeName);
      if (masterItem) {
				// replace
				mergeSource(branchItem, masterItem);
				masterItem.remove();
			}

			// restore name
			branchItem.name = branchItem.name.slice(0, -8);
		}
	});

	branch.items.forEach(function(branchItem) {
		master.items.forEach(function(masterItem) {
			if (masterItem.name == branchItem.name) {
				masterItem.name += "[old]";
			}
		});
		branchItem.parentFolder = master;
	});

	branch.remove();

	alert("[old]って付いてるフォルダは, 多分消していいフォルダです. 内容確認して大丈夫そうなら消してOKです.");

});