bk_AEScripts
-----

My ExtendScript for After Effects.
These are my personal tools and I develop little by little on the side of my work. 

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

**CreateProxy.jsx** adds seleted comps to render queue using `proxy` settings in JSON. (e.g. "Test" comps are rendered using  "Best Settings" in render settings, "Lossless with Alpha" in output module, and exported to `[working folder]/proxy/Test`.)

**CreateFinal.jsx** also behaves similar to above but using `final` settings.

