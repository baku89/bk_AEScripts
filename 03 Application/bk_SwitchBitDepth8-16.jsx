#include "../(bk_include)/common.jsx"

run(function() {

	var depth = app.project.bitPerChannel;
	var targetDepth;

	if (depth == 8) {
		targetDepth = 16;
	} else if (depth == 16) {
		targetDepth = 8;
	}

	app.project.bitPerChannel = targetDepth;

});