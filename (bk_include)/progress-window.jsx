/*
Example:

var progress = new ProgressWindow();
progress.update(0, 'test');
progress.update(0.1, 'test');
progress.update(0.5, 'test');

*/

function ProgressWindow() {

	this.update = function(progress, message) {

		if (!this.window) {
			var res =
				"""palette {
					orientation: 'column', alignment: ['fill', 'top'],
					message: StaticText {text: 'aaa'},
					progress: Group {
						orientation: 'stack',
						alignment: ['fill', 'fill'],
						bounds: [0, 0, 300, 26],
						bar: Progressbar {minvalue: 0, maxvalue: 1, alignment: ['fill', 'fill']}
						text: StaticText {text: '', justify: 'center', alignment: ['fill', 'fill']},
					}
				}""";

			this.window = new Window(res);

			this.window.center();
			this.window.show();
		}

		this.window.message.text = message;
		this.window.progress.text.text = Math.floor(progress * 100) + '%';
		this.window.progress.bar.value = progress;

		if (progress >= 1) {
			this.window.close();
		}
	}
}