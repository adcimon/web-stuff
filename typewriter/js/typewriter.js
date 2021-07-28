"use strict";

function Typewriter()
{
//#region PRIVATE

	let write = function( text, container, settings )
	{
		let defaultSettings =
		{
			speed: 10,
			fadeDuration: 0.5
		};

		settings = (typeof settings !== "object") ? { } : settings;
	    settings = Object.assign(defaultSettings, settings);

		empty(container);

		for( let i = 0; i < text.length; i++ )
		{
			let char = text[i];

			let span = '<div id ="' + 'char' + i + '" ' +
						'class="char" ' +
						'style="' +
							'animation: charAnimation ' + settings.fadeDuration + 's linear ' + (i / settings.speed) + 's forwards;' +
							((char === '\n') ? " display: block;" : "") +
						'">'
						+ char +
					'</div>';

			let template = document.createElement("template");
			template.innerHTML = span;

			let element = template.content.firstChild;
			container.appendChild(element);
		}
	};

	let empty = function( node )
	{
		while( node.firstChild )
		{
			node.removeChild(node.lastChild);
		}
	};

//#endregion

//#region PUBLIC

	return {
		write
	};

//#endregion
}