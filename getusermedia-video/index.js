var video;

var constraints =
{
	audio: false,
	video: true
}

window.addEventListener("load", main);

function main()
{
	video = document.getElementById("video");

	window.navigator.mediaDevices.getUserMedia(constraints).then(onGetUserMediaSuccess).catch(onGetUserMediaError);
}

function onGetUserMediaSuccess( stream )
{
	video.srcObject = stream;
}

function onGetUserMediaError( error )
{
	alert(error);
}