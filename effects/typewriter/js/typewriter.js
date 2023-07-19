'use strict';

function Typewriter() {
	const write = function (text, container, settings) {
		let defaultSettings = {
			speed: 10,
			fadeDuration: 0.5,
		};

		settings = typeof settings !== 'object' ? {} : settings;
		settings = Object.assign(defaultSettings, settings);

		empty(container);

		for (let i = 0; i < text.length; i++) {
			const char = text[i];

			const span =
				'<div id ="' +
				'char' +
				i +
				'" ' +
				'class="char" ' +
				'style="' +
				'animation: charAnimation ' +
				settings.fadeDuration +
				's linear ' +
				i / settings.speed +
				's forwards;' +
				(char === '\n' ? ' display: block;' : '') +
				'">' +
				char +
				'</div>';

			const template = document.createElement('template');
			template.innerHTML = span;

			const element = template.content.firstChild;
			container.appendChild(element);
		}
	};

	const empty = function (node) {
		while (node.firstChild) {
			node.removeChild(node.lastChild);
		}
	};

	return {
		write,
	};
}
