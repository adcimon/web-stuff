"use strict";

window.addEventListener("load", main);

function main()
{
	let typewriter = new Typewriter();

	let text = "Holding onto anger is like drinking poison " + '\n' + "and expecting the other person to die." + '\n' + "- Buddah.";
	let container = document.querySelector("#text");
	let settings = { speed: 10, fadeDuration: 0.5 };

	typewriter.write(text, container, settings);
}