"use strict";

window.addEventListener("load", main);

function main()
{
	window.addEventListener("mousemove", onMouseMove);
	document.body.addEventListener("touchmove", onTouchMove);
}

function onMouseMove( event )
{
	const x = event.clientX;
	const y = event.clientY;

	const particle = new Particle(document.body);
	particle.spawn(x, y);
}

function onTouchMove( event )
{
	event.preventDefault();

	const x = event.touches[0].clientX;
	const y = event.touches[0].clientY;

	const particle = new Particle(document.body);
	particle.spawn(x, y);
}