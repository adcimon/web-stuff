"use strict";

function EventSystem()
{
	this.events = { };
}

/**
 * Add a function that will be called whenever the specified event is emitted.
 * @param {String} event - The event name.
 * @param {Function} listener - The function to add.
 */
EventSystem.prototype.on = function( event, listener )
{
	if( typeof this.events[event] !== "object" )
	{
		this.events[event] = [];
	}

	this.events[event].push(listener);
}

/**
 * Remove the function previously added to be called whenever the specified event is emitted.
 * @param {String} event - The event name.
 * @param {Function} listener - The previously added function.
 */
EventSystem.prototype.off = function( event, listener )
{   
	if( typeof this.events[event] === "object" )
	{
		let index = this.events[event].indexOf(listener);
		if( index > -1 )
		{
			this.events[event].splice(index, 1);
		}
	}
}

/**
 * Emit the specified event.
 * @param {String} event - The event name.
 */
EventSystem.prototype.emit = function( event )
{
	let args = [].slice.call(arguments, 1);

	if( typeof this.events[event] === "object" )
	{
		let listeners = this.events[event].slice();
		for( let i = 0; i < listeners.length; i++ )
		{
			listeners[i].apply(this, args);
		}
	}
}

export { EventSystem };
