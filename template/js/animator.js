"use strict";

function Animator()
{
	this.handle = undefined;
	this.lastUpdate = undefined;
}

Animator.prototype.update = function()
{
	let now = window.Date.now();

	if( this.lastUpdate )
	{
		let deltaTime = (now - this.lastUpdate) / 1000; // s
		this.lastUpdate = now;

		this.callback(deltaTime);
	}
	else
	{
		this.lastUpdate = now;
	}
}

Animator.prototype.tick = function()
{
	this.update();
	this.handle = window.requestAnimationFrame(this.tick.bind(this));
}

Animator.prototype.play = function()
{
	if( callback && !(callback instanceof Function) )
	{
		console.log("Callback " + callback + " is not a function.");
		return;
	}

	if( callback )
	{
		this.callback = callback;
	}

	if( !this.callback )
	{
		console.log("Callback is undefined.");
		return;
	}

	if( !this.handle )
	{
		this.tick();
	}
}

Animator.prototype.stop = function()
{
	if( this.handle )
	{
		window.cancelAnimationFrame(this.handle);
		this.handle = undefined;
		this.lastUpdate = undefined;
	}
}

export { Animator };
