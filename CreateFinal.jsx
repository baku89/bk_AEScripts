﻿#include "include/util.jsx"var settings;var finalDir, timestamp;(function main() {        if ( !app.project ) {        alert("Any project is not opened.");        return;    }        if ( (settings = loadSettings()) === null ) {        return;    }    finalDir = resolveRelativePath(        settings["project_path"],        settings["final"]["directory"]    );            timestamp = (function() {        var now = new Date();        return ( "0" + (now.getMonth()+1) ).substr( -2 ) +            ( "0" + now.getDate() ).substr( -2 );    })();    // get active compositions    comps = getSelectedComp();        if ( comps === null ) {        alert("No Composition Selected!");        return;    }    // create directory    Folder( finalDir + "/" + timestamp ).verify();        // add queue    for ( var i = 0; i < comps.length; i++ ) {        addQueue( comps[i] );    }        return;})();function addQueue( comp ) {    // setup queue    var queue = app.project.renderQueue.items.add( comp );    queue.applyTemplate( settings["final"]["render_settings"] );        var om = queue.outputModule( 1 );    var template = settings["final"]["output_module"];    try {        om.applyTemplate( template );    } catch ( err ) {        alert("Spedified output module template \"" + template + "\" is not valid");    }                var destPath = finalDir + "/" + timestamp + "/"        + comp.name + "_" + timestamp + ".mov";    om.file = new File( destPath );}