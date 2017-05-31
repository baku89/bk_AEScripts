bk_AEScripts
-----

My ExtendScript for After Effects.

## Installing

### Download zip

Download zip file from 'Clone or Downlaod' button on top-left of this page, then unzip and place them at script folder of AE.

### Use git

(macOS) Open Terminal and type below:

```
git clone git@github.com:baku89/bk_AEScripts.git [Plugin Folder]
```

e.g. After Effects CC2015 on osx
```
git clone git@github.com:baku89/bk_AEScripts.git "/Applications/Adobe After Effects CC 2015/Scripts"
```


<!--
## Project settings in JSON

For example:

### directory structure
```md
[working folder]
+-- proj
|   +--- project.aep
|   +--- project-settings.json
+-- xy (using for proxy)
+-- out (using for daily rendering for check)
    +--- 0727
    +--- 0728
    +--- ...
```

### project-settings.json
```json
{
	"proxy": {
		"directory": "../xy",
		"render_settings": "Best Settings",
		"output_module": "Lossless with Alpha"
	},

	"final": {
		"directory": "../out",
		"render_settings": "Best Settings",
		"output_module": "ProRes422HQ"
	}
}
```

**CreateProxy.jsx** adds seleted comps to render queue using `proxy` settings in JSON. (i.e. If you select "Test" composition, it will be rendered using  "Best Settings" in render settings, "Lossless with Alpha" in output module, and exported to `[working folder]/proxy/Test.mov`.)

**CreateFinal.jsx** also behaves similar to above but using `final` settings.

-->