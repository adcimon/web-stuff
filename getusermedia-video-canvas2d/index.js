var video, canvas, context;

var constraints =
{
	audio: false,
	video: true
}

window.addEventListener("load", main);

function main()
{
	video = document.getElementById("video");
	canvas = document.getElementById("canvas");;
	context = canvas.getContext("2d");

	video.addEventListener("canplay", onCanPlay);

	window.navigator.mediaDevices.getUserMedia(constraints).then(onGetUserMediaSuccess).catch(onGetUserMediaError);
}

function render()
{
	// The video may not match the canvas size so find a scale to fit.
	var scale = Math.min(canvas.width / video.videoWidth, canvas.height / video.videoHeight);

	// Find the top left of the video on the canvas.
	var height = video.videoHeight;
	var width = video.videoWidth;
	var top = canvas.height / 2 - (height / 2 ) * scale;
	var left = canvas.width / 2 - (width / 2 ) * scale;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(video, left, top, width * scale, height * scale);

	window.requestAnimationFrame(render);
}

function onCanPlay( event )
{
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	window.requestAnimationFrame(render);
}

function onGetUserMediaSuccess( stream )
{
	video.srcObject = stream;
}

function onGetUserMediaError( error )
{
	alert(error);
}