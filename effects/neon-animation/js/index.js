"use strict";

window.addEventListener("load", main);

function main()
{
	const element = document.querySelector("#text");

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const text = urlParams.get("text");
	if( text )
	{
		element.innerHTML = text;
	}

	const fontSize = urlParams.get("fontSize");
	if( fontSize )
	{
		element.style.fontSize = fontSize;
	}
}