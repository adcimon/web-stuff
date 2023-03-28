"use strict";

window.addEventListener("load", main);

function main()
{
	const wave1 = new Wave(document.querySelector("#path1"),
	{
		height: 70,
		bones: 6,
		amplitude: 40,
		speed: 0.25
	});
	wave1.play();

	const wave2 = new Wave(document.querySelector("#path2"),
	{
		height: 70,
		bones: 7,
		amplitude: 40,
		speed: 0.3
	});
	wave2.play();
}