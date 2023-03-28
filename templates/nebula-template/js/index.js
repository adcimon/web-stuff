"use strict"

function main()
{
	const descriptionPopup = document.getElementById("descriptionPopup");
	const okButton = document.getElementById("okButton");
	okButton.addEventListener("click", function()
	{
		descriptionPopup.style.display = "none";
	});
}

window.addEventListener("load", main);