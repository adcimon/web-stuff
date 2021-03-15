"use strict";

function Typewriter()
{
}

Typewriter.prototype.write = function( text, container, settings )
{
	this.empty(container);

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
}

Typewriter.prototype.empty = function( node )
{
	while( node.firstChild )
	{
		node.removeChild(node.lastChild);
	}
}
