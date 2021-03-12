/**
 * Return a clone of the object.
 * @param {Object} object - The object to clone.
 * @return {Object} The clone of the object.
 */
function clone( object )
{
    return Object.create(object);
}

/** 
 * Return a function, that, as long as it continues to be invoked, will not be executed until N milliseconds have passed.
 * @param {String} func - The function to execute.
 * @param {Number} wait - The time to wait.
 * @param {Boolean} immediate - Execute the function immediately.
 */
function debounce( func, wait, immediate )
{
    let timeout;
    return function()
    {
        let context = this;
        let args = arguments;

        let later = function()
        {
            timeout = null;
            if( !immediate )
            {
                func.apply(context, args);
            }
        };

        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if( callNow )
        {
            func.apply(context, args);
        }
    };
}

/**
 * Return the elements that match the specified selector.
 * @param {String} selector - The selector.
 * @return {Node, NodeList} The Node or NodeList.
 */
HTMLElement.prototype.query = function( selector )
{
    let elements = this.querySelectorAll(selector);
    return (elements.length === 1) ? elements[0] : elements;
};

/**
 * Enable the HTMLElement.
 */
HTMLElement.prototype.enable = function()
{
    this.disabled = false;
};

/**
 * Disable the HTMLElement.
 */
HTMLElement.prototype.disable = function()
{
    this.disabled = true;
};

/**
 * Show the HTMLElement.
 */
HTMLElement.prototype.show = function()
{
    if( this.style.display !== "none" )
    {
        return;
    }

    this.style.display = (this.oldDisplay) ? this.oldDisplay : "block";
};

/**
 * Hide the HTMLElement.
 */
HTMLElement.prototype.hide = function()
{
    if( this.style.display === "none" )
    {
        return;
    }

    this.oldDisplay = this.style.display;
    this.style.display = "none";
};

/** 
 * Get / Set / List attributes of HTMLElement.
 * @param {String} key - The key.
 * @param {String} value - The value.
 * @return {Object, NamedNodeMap} The attribute value or list of attributes.
 */
HTMLElement.prototype.attr = function( key, value )
{
    if( !value )
    {
        if( !key )
        {
            return this.attributes;
        }

        return this.getAttribute(key);
    }

    this.setAttribute(key, value);
    return this;
}

/** 
 * Remove the attribute of an HTMLElement specified by the key.
 * @param {String} key - The key.
 */
HTMLElement.prototype.removeAttr = function( key )
{
    this.removeAttribute(key)
    return this;
}

/** 
 * Return a boolean value indicating whether the specified element has the specified attribute or not.
 * @param {String} attribute - The attribute.
 * @return {Boolean} Has the specified attribute?
 */
HTMLElement.prototype.has = function( attribute )
{
    return this.hasAttribute(attribute);
}

/** 
 * Get / Set the innerHTML of the HTMLElement.
 * @param {String} string - The html string.
 * @return {String} The innerHTML.
 */
HTMLElement.prototype.html = function( string )
{
    if( !string )
    {
        return this.innerHTML;
    }

    this.innerHTML = string;
    return this;
}

/** 
 * Get / Set the innerText of the HTMLElement.
 * @param {String} string - The text string.
 * @return {String} The textContent.
 */
HTMLElement.prototype.text = function( string )
{
    if( !string )
    {
        return this.textContent;
    }

    this.innerText = string;
    return this;
}

/** 
 * Append the HTMLElement to another HTMLElement.
 * @param {HTMLElement} child - The HTML element.
 */
HTMLElement.prototype.append = function( child )
{
    if( child instanceof HTMLElement )
    {
        this.appendChild(child);
    }

    return this;
}

/** 
 * Prepend the HTMLElement to another HTMLElement sibling.
 * @param {HTMLElement} sibling - The HTML element.
 */
HTMLElement.prototype.prepend = function( sibling )
{
    if( sibling instanceof HTMLElement )
    {
        this.parentNode.insertBefore(sibling, this);
    }

    return this;
}

/** 
 * Remove the HTMLElement.
 */
HTMLElement.prototype.remove = function()
{
    this.parentNode.removeChild(this);
}

/** 
 * Remove all the children of the HTMLElement.
 */
HTMLElement.prototype.removeChildren = function()
{
    let child = this.firstElementChild;
    while( child )
    {
        this.removeChild(child);
        child = this.firstElementChild;
    }
}

/** 
 * Return the parent of the HTMLElement.
 * @return {HTMLElement} The HTMLElement parent.
 */
HTMLElement.prototype.parent = function()
{
    return this.parentNode;
}

/** 
 * Add an event listener to the HTMLElement.
 * @param {String} event - The event to listen for.
 * @param {Object} callback - The object that receives the notification.
 * @param {Object} options - The options object.
 */
HTMLElement.prototype.on = function( event, callback, options )
{
    this.addEventListener(event, callback, options);
    return this;
}

/** 
 * Remove an event listener from the HTMLElement.
 * @param {String} event - The event to remove for.
 * @param {Object} callback - The object that receives the notification.
 * @param {Object} options - The options object.
 */
HTMLElement.prototype.off = function( event, callback, options )
{
    this.removeEventListener(event, callback, options);
    return this;
}

/** 
 * Dispatch an event on the HTMLElement.
 * @param {String} event - The event to dispatch.
 * @param {Object} args - The event arguments.
 */
HTMLElement.prototype.emit = function( event, args = null )
{
    this.dispatchEvent(event, new CustomEvent(event, { detail: args }));
    return this;
}
