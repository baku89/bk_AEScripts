//-----------------------------------------------------------------
// main

function Dialog(params, uid) {
		
	this.params = params;
	this.uid = uid;

	this.show = function() {

		var w = new Window( 'dialog', uid || '', [0, 0, 400, 150], {resizable: true});
		w.center();

		// add property
		var controls = {};

		// window dimentions

		var LABEL_WIDTH = 90;
		var ROW_HEIGHT = 26;
		var UI_BOUNDS = [0, 0, 240, ROW_HEIGHT];

		for ( var key in params ) {

			(function() {

				var param = params[key];
				var label = param.label || key;
				var value = param.value;

				if (uid !== undefined && app.settings.haveSetting(uid, key)) {
					value = app.settings.getSetting(uid, key);
				}

				var g = w.add('group');
				g.alignment = ['left', 'center'];

				// add label
				g.add('statictext', [0, 0, LABEL_WIDTH, ROW_HEIGHT], label);

				// add ui
				switch (param.type) {

					case 'string':
						if (param.dropdown instanceof Array) {
							controls[key] = addDropDownList(g, UI_BOUNDS, value, param.dropdown);
						} else {
							controls[key] = addEditText(g, UI_BOUNDS, value);
						}
						break;

					case 'number':
						if (param.min !== undefined && param.max !== undefined) {
							controls[key] = addSlider(g, UI_BOUNDS, value, param.min, param.max);
						} else {
							controls[key] = addEditNumber(g, UI_BOUNDS, value);
						}
						break;

					case 'boolean':
						controls[key] = addCheckbox(g, UI_BOUNDS, value);
						break;
				}

			})();
		}
					
		// add ok / cancel button

		var footer = w.add('group');
		footer.alignment = ['right', 'center'];
		footer.add('button', undefined, 'OK', 		{name: 'ok'});
		footer.add('button', undefined, 'Cancel', {name: 'cancel'});


		w.layout.layout(true);

		// show
		var result = null;

		if (w.show() < 2) {

			result = {};

			for (key in params) {

				var value = controls[key].getValue();
				result[key] = value;

				if (uid !== undefined && value !== undefined) {
					app.settings.saveSetting(uid, key, value);
				}
			}
		}

		return result;
	}
}

//-----------------------------------------------------------------
// utils & alias

function showDialog(params, uid) {
	var dialog = new Dialog(params, uid);
	return dialog.show();
}

function clamp(val, minVal, maxVal) {
	return Math.min(Math.max(val, minVal), maxVal);
}


//-----------------------------------------------------------------
// custom ui



function addEditNumber(g, bounds, value) {

	var et = g.add('edittext', bounds);

	var prevVal = value;

	function dispatchUpdate() {
		var event = ScriptUI.events.createEvent('UIEvent');
		event.initUIEvent('update', true, true, et);
		et.dispatchEvent(event);
	}

	et.addEventListener('keydown', function(e) {

		if (!e.keyName.match(/Up|Down/)) {
			return;
		}

		var step = 1;

		if (e.altKey) step /= 10;
		if (e.shiftKey) step *= 10;

		var newVal = Number(et.text);

		switch (e.keyName) {
			case 'Up':
				newVal += step;
				break;
			case 'Down':
				newVal -= step;
				break;
		}

		et.text = newVal;
		prevVal = newVal;
		
		e.preventDefault();

		dispatchUpdate();
	});

	et.addEventListener('change', function(e) {
		var newVal = Number(et.text);

		if (isNaN(newVal)) {
			et.text = prevVal;
		} else {
			et.text = newVal;
			prevVal = newVal;
		}

		dispatchUpdate();
	});

	et.text = value;

	return {
		control: et,
		getValue: function() { return Number(et.text); }
	};
}


function addEditText(g, bounds, value) {
	var et = g.add('edittext', [bounds[0], bounds[1], bounds[2], bounds[3]]);
	et.text = value;

	return {
		getValue: function() { return value; }
	};
}


function addDropDownList(g, bounds, value, dropdown) {

	var ddl = g.add('dropdownlist', bounds);

	var selectedIndex = 0;

	dropdown.forEach(function(item, i) {
		ddl.add('item', item);
		if (item == value) {
			selectedIndex = i;
		}
	});

	ddl.selection = ddl.items[selectedIndex];

	return {
		getValue: function() { return ddl.selection.text; }
	};
}


function addCheckbox(g, bounds, value) {

	var cb = g.add('checkbox', bounds);
	// hack
	if (value === true) {
		cb.value = true;
	} else {
		cb.value = false;
	}

	return {
		getValue: function() { return cb.value; }
	}
}

function addSlider(g, bounds, value, min, max) {

	var slider = g.add('slider', [bounds[0], bounds[1], bounds[2] - 50, bounds[3]]);
	slider.value = value;
	slider.minvalue = min;
	slider.maxvalue = max;

	var et = addEditNumber(g, [bounds[0], bounds[1], 40, bounds[3]], value).control;

	slider.onChanging = slider.onChange = function() {
		et.text = slider.value;
	};

	et.addEventListener('update', function() {

		var newVal = clamp(Number(et.text), min, max);

		if (isNaN(newVal)) {
			newVal = slider.value;
		}

		slider.value = newVal;
		et.text = newVal;
	});

	return {
		getValue: function() { return slider.value; }
	}
}
