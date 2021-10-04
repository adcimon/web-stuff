"use strict";

function EventSystem()
{
	let events = { };

	/**
	 * Add a function that will be called whenever the specified event is emitted.
	 */
	let on = function( event, listener )
	{
		if( typeof events[event] !== "object" )
		{
			events[event] = [];
		}

		events[event].push(listener);
	};

	/**
	 * Remove the function previously added to be called whenever the specified event is emitted.
	 */
	let off = function( event, listener )
	{   
		if( typeof events[event] === "object" )
		{
			let index = events[event].indexOf(listener);
			if( index > -1 )
			{
				events[event].splice(index, 1);
			}
		}
	};

	/**
	 * Emit the specified event.
	 */
	let emit = function( event )
	{
		let args = [].slice.call(arguments, 1);

		if( typeof events[event] === "object" )
		{
			let listeners = events[event].slice();
			for( let i = 0; i < listeners.length; i++ )
			{
				listeners[i].apply(this, args);
			}
		}
	};

	return {
		on,
		off,
		emit
	};
}
