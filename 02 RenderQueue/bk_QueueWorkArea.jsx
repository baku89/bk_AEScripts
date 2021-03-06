#include "../(bk_include)/common.jsx"

run(function() {

	var comp = getActiveComp();

  var start = comp.workAreaStart;
  var duration = comp.workAreaDuration;

  // add render queue and set custom in-out
  // log([start, duration]);

  var queue = app.project.renderQueue.items.add(comp);
  queue.timeSpanStart = start;
  queue.timeSpanDuration = duration;

});