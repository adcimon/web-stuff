"use strict";

var container, mosaic;

window.addEventListener("load", main);
window.addEventListener("resize", resize);

function main()
{
	container = document.getElementById("container");
	mosaic = document.getElementById("mosaic");

	populate();

	resize();
}

function createItem()
{
	let html ='<div class="item"><video src="media/video.mp4" autoplay controls loop muted></video></div>';

    let template = document.createElement("template");
    template.innerHTML = html;
    return template.content.childNodes[0];
}

function populate()
{
	let itemCount = Math.ceil(Math.random() * 10);
	for( let i = 0; i < itemCount; i++ )
	{
		let item = createItem();
		mosaic.append(item);
	}
}

function resize()
{
	let containerWidth = container.getBoundingClientRect().width;
	let containerHeight = container.getBoundingClientRect().height;
	let margin = 30;
	let itemCount = document.getElementsByClassName("item").length;
	let aspectRatio = 16 / 9;

	let { width, height, columns } = calculateLayout(containerWidth, containerHeight, margin, itemCount, aspectRatio);

	mosaic.style.setProperty("--width", width + "px");
	mosaic.style.setProperty("--height", height + "px");
	mosaic.style.setProperty("--columns", columns + "");
}

function calculateLayout( containerWidth, containerHeight, margin, itemCount, aspectRatio )
{
	containerWidth -= margin;
	containerHeight -= margin;

	let layout =
	{
		area: 0,
		columns: 0,
		rows: 0,
		width: 0,
		height: 0
	};

	// Search a layout where the items occupy the largest area of the container.
	for( let columns = 1; columns <= itemCount; columns++ )
	{
		let rows = Math.ceil(itemCount / columns);
		let horizontalScale = containerWidth / (columns * aspectRatio);
		let verticalScale = containerHeight / rows;

		let width;
		let height;
		if( horizontalScale <= verticalScale )
		{
			width = Math.floor(containerWidth / columns);
			height = Math.floor(width / aspectRatio);
		}
		else
		{
			height = Math.floor(containerHeight / rows);
			width = Math.floor(height * aspectRatio);
		}

		let area = width * height;
		if( area > layout.area )
		{
			layout =
			{
				area,
				width,
				height,
				rows,
				columns
			};
		}
	}

	return { width: layout.width, height: layout.height, columns: layout.columns };
}