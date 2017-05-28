﻿#include "bk_include/json2.js"// laod settings from JSONfunction loadSettings() {    if ( !app.project.file ) {        alert("No AEP opened");        return null;    }    aepPath = app.project.file.toString();    aepDir = aepPath.match( /^(.*)\// )[1];     settingsPath = aepDir + '/project-settings.json';    settingsFile = File( settingsPath );    if ( settingsFile === false ) { // if it is really there        alert("Cannot open project-settings.json");        return null;    }    try {        settingsFile.open('r');        var content = settingsFile.read();             settings = JSON.parse( content );        settingsFile.close();            } catch ( err ) {        alert("Cannot parse project-settings.json");    }    settings["project_path"] = aepDir;    return settings;}function getDirectory( settings, name ) {    $.writeln( settings["project_path"] );    $.writeln( settings["directories"][name] );            return resolveRelativePath(        settings["project_path"],        settings["directories"][ name ]    );}function getSelectedLayer() {    var comps = getSelectedComp();    if (comps == null) {        return null;    } else {        var activeComp = comps[0];        var layers = activeComp.selectedLayers;        return (layers.length != 0) ? layers : null;    }}// load all selected compositionfunction getSelectedComp() {      comps = [];        if ( app.project.activeItem !== null ) {            alert( "ActiveItme ");        comps.push( app.project.activeItem );        } else {        var items = app.project.selection;        for ( var i = 0; i < items.length; i++ ) {            if ( items[i] instanceof CompItem )                comps.push( items[i] );        }    }    return ( comps.length ) != 0 ? comps : null;}function getActiveRenderQueue() {     var queues = app.project.renderQueue.items;    var activeQueues = [];    for (var i = 0; i < queues.length; i++) {        if (queues.render[i]) {            activeQueues.push(queues[i]);        }    }    return activeQueues;}// http://stackoverflow.com/questions/14780350/convert-relative-path-to-absolute-using-javascriptfunction resolveRelativePath(base, relative) {    var stack = base.split("/"),        parts = relative.split("/");for (var i=0; i < parts.length; i++) {        if (parts[i] == ".")            continue;        if (parts[i] == "..")            stack.pop();        else            stack.push(parts[i]);    }    return stack.join("/");}