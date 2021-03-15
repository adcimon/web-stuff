"use strict";

function Particle( container )
{
	this.container = container;
	this.particle = undefined;
}

Particle.prototype.spawn = function( x, y )
{
	let size = Math.random() * 50 + 10;

	x -= (size / 2);
	y -= (size / 2);

	this.particle = document.createElement("div");
	this.particle.classList.add("particle");
	this.container.appendChild(this.particle);

	gsap.set(this.particle,
	{
		x: x, 
		y: y,
		width: size,
		height: size,
		background: function()
		{
			let hue = Math.random() * 90 + 100;
			return "hsl(" + hue + ", 50%, 50%)";
		}
	});

	let self = this;
	gsap.to(this.particle, Math.random() * 2 + 1,
	{
		x: x + (Math.random() - 0.5) * 200,
		y: y + (Math.random() - 0.5) * 200,
		opacity: 0,
		scale: 0,
		ease: Power2.easeOut,
		onComplete: function()
		{
			self.container.removeChild(self.particle);
		}
	});
}
