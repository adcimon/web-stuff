export function Animator()
{
//#region PRIVATE

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
	};

	/**
	 * Tick the animator for 1 frame.
	 */
	let tick = function()
	{
		update();
		handle = window.requestAnimationFrame(tick);
	};

	/**
	 * Play the animator.
	 * @param {Function} func - The callback function.
	 */
	let play = function( func )
	{
		if( handle )
		{
			console.log("Animator is already playing.");
			return;
		}

		if( !(func instanceof Function) )
		{
			console.log("Animator callback " + func + " is not a function.");
			return;
		}

		callback = func;
		tick();
	};

	/**
	 * Stop the animator.
	 */
	let stop = function()
	{
		if( !handle )
		{
			return;
		}

		window.cancelAnimationFrame(handle);
		handle = null;
		lastUpdate = null;
	};

//#endregion

//#region PUBLIC

	return {
		play,
		stop
	};

//#endregion
}