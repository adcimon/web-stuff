"use strict";

window.addEventListener("load", main);

function main()
{
	window.addEventListener("mousemove", onMouseMove);
	document.body.addEventListener("touchmove", onTouchMove);
}

function onMouseMove( event )
{
	let x = event.clientX;
	let y = event.clientY;

	let particle = new Particle(document.body);
	particle.spawn(x, y);
}

function onTouchMove( event )
{
	event.preventDefault();

	let x = event.touches[0].clientX;
	let y = event.touches[0].clientY;

	let particle = new Particle(document.body);
	particle.spawn(x, y);
}
