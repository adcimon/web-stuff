"use strict"

function main()
{
	let descriptionPopup = document.getElementById("descriptionPopup");
	let okButton = document.getElementById("okButton");
	okButton.addEventListener("click", function()
	{
		descriptionPopup.style.display = "none";
	});
}

window.addEventListener("load", main);