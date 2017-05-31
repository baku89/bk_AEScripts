// add render queue of active comp to make render
// 
#include "../(bk_include)/common.jsx"

function getActiveQueue() {

	 var queues = app.project.renderQueue.items;
	 var activeQueues = [];

	 queues.forEach(function(queue) {
		if (queue.status == RQItemStatus.QUEUED) {
			activeQueues.push(queue);
		}
	 });

	 return activeQueues;
}

run(function() {

	var queues = getActiveQueue();

	if (queues.length == 0) {
		throw "No queues";
	}

	var proxyDir = new Folder(app.project.file.parent.parent.fullName + "/xy");
	if (!proxyDir.exists) {
		proxyDir.create();
	}
	var proxyPath = proxyDir.fullName;

	queues.forEach(function(queue) {

		if (queue.outputModules.length > 0) {
			var om = queue.outputModules[1];
			var filename = om.file.name;
			var outputFile = new File(proxyPath + "/" + filename);
			om.file = outputFile;
			om.postRenderAction = PostRenderAction.SET_PROXY;
		}
		
	});

});



// settings = loadSettings();

// (function main() {


//     // get active compositions
//     items = getSelectedComp();
	
//     if ( items === null ) {
//         alert("No Composition Selected!");
//         return;
//     }
	
//     for ( var i = 0; i < items.length; i++ ) {
//         addProxy( items[i] );
//     }
	
//     return;
// })();


// function addProxy( item ) {
 
//     // delete current proxy if it exists
//     if ( item.useProxy ) {
		
//         // delete from system command
//         var proxyPath = item.proxySource.file.toString();
//         item.setProxyToNone();
		
//         var stdout = system.callSystem( "rm '" + proxyPath + "'" );
		
//         if ( stdout != "" ) {
//             alert( stdout );
//         }
//     }
	 
//     // setup queue
//     var queue = app.project.renderQueue.items.add( item );
//     queue.applyTemplate( settings["render_settings_template"] );
	
//     var output = queue.outputModule( 1 );    
//     output.applyTemplate( settings["output_module_template"] );
//     output.postRenderAction = PostRenderAction.SET_PROXY;
	
//     var destPath = getDirectory( settings, "proxy" ) + "/" + item.name + ".mov";
//     output.file = new File( destPath );
// }