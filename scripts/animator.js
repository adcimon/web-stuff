"use strict";

export function Animator()
{
	let handle = null;
	let lastUpdate = null;
	let callback = null;

	/**
	 * Update the animator time.
	 */
	let update = function()
	{
		let now = window.Date.now();

		if( lastUpdate )
		{
			let deltaTime = (now - lastUpdate) / 1000; // s
			lastUpdate = now;

			callback(deltaTime);
		}
		else
		{
			lastUpdate = now;
		}
	}

	/**
	 * Tick the animator for 1 frame.
	 */
	let tick = function()
	{
		update();
		handle = window.requestAnimationFrame(tick);
	}

	/**
	 * Play the animator.
	 */
	let play = function( func )
	{
		if( handle )
		{
			console.log("Animator is already playing.");
			return false;
		}

		if( !(func instanceof Function) )
		{
			console.log("Animator callback " + func + " is not a function.");
			return false;
		}

		callback = func;
		tick();

		return true;
	}

	/**
	 * Stop the animator.
	 */
	let stop = function()
	{
		if( !handle )
		{
			return false;
		}

		window.cancelAnimationFrame(handle);
		handle = null;
		lastUpdate = null;

		return true;
	}

	return {
		play,
		stop
	};
}
