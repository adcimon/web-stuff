"use strict";

export function EventSystem()
{
	const events = { };

	/**
	 * Add a function that will be called whenever the specified event is emitted.
	 */
	const on = function( event, listener )
	{
		if( typeof events[event] !== "object" )
		{
			events[event] = [];
		}

		events[event].push(listener);
	}

	/**
	 * Remove the function previously added to be called whenever the specified event is emitted.
	 */
	const off = function( event, listener )
	{   
		if( typeof events[event] === "object" )
		{
			const index = events[event].indexOf(listener);
			if( index > -1 )
			{
				events[event].splice(index, 1);
			}
		}
	}

	/**
	 * Emit the specified event.
	 */
	const emit = function( event )
	{
		const args = [].slice.call(arguments, 1);

		if( typeof events[event] === "object" )
		{
			const listeners = events[event].slice();
			for( let i = 0; i < listeners.length; i++ )
			{
				listeners[i].apply(this, args);
			}
		}
	}

	return {
		on,
		off,
		emit
	};
}
