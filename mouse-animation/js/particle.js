"use strict";

function Particle( container )
{
//#region PRIVATE

	let spawn = function( x, y )
	{
		let size = Math.random() * 50 + 10;

		x -= (size / 2);
		y -= (size / 2);

		let particle = document.createElement("div");
		particle.classList.add("particle");
		container.appendChild(particle);

		gsap.set(particle,
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

		gsap.to(particle, Math.random() * 2 + 1,
		{
			x: x + (Math.random() - 0.5) * 200,
			y: y + (Math.random() - 0.5) * 200,
			opacity: 0,
			scale: 0,
			ease: Power2.easeOut,
			onComplete: function()
			{
				container.removeChild(particle);
			}
		});
	};

//#endregion

//#region PUBLIC

	return {
		spawn
	};

//#endregion
}