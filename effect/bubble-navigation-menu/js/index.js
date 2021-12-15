"use strict";

window.addEventListener("load", main);

function main()
{
    const items = document.querySelectorAll(".nav-item");

    function activeItem()
    {
        items.forEach((item) =>
        {
            item.classList.remove("active");
            this.classList.add("active");
        });
    }

    items.forEach((item) =>
    {
        item.addEventListener("click", activeItem);
    });
}
