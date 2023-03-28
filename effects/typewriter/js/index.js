"use strict";

window.addEventListener("load", main);

function main()
{
	const typewriter = new Typewriter();

	const text = "Holding onto anger is like drinking poison " + '\n' + "and expecting the other person to die." + '\n' + "- Buddah.";
	const container = document.querySelector("#text");
	const settings = { speed: 10, fadeDuration: 0.5 };

	typewriter.write(text, container, settings);
}