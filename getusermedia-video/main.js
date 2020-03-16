"use strict";

var video = document.getElementById("video");

var constraints =
{
	audio: false,
	video: true
}

main();

function main()
{
	window.navigator.mediaDevices.getUserMedia(constraints).then(onGetUserMediaSuccess).catch(onGetUserMediaError);
}

function onGetUserMediaSuccess( stream )
{
	video.srcObject = stream;
}

function onGetUserMediaError( error )
{
	alert("Get user media error: " + error);
}