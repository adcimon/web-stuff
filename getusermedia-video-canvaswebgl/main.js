var video, canvas, gl;

var vertexBuffer, indexBuffer, textureCoordinateBuffer;

var texture, program;

var vertexSource =
`
attribute vec3 aPosition;
attribute vec2 aTextureCoordinate;

varying highp vec2 vTextureCoordinate;

void main()
{
	gl_Position = vec4(aPosition, 1.0);
	vTextureCoordinate = aTextureCoordinate;
}
`;

var fragmentSource =
`
uniform sampler2D uFrame;

varying highp vec2 vTextureCoordinate;

void main()
{
	gl_FragColor = texture2D(uFrame, vTextureCoordinate);
}
`;

var constraints =
{
	audio: false,
	video: true
}

window.addEventListener("load", main);

function main()
{
	video = document.getElementById("video");
	canvas = document.getElementById("canvas");
	gl = canvas.getContext("webgl");

	init();

	video.addEventListener("canplay", onCanPlay);

	window.navigator.mediaDevices.getUserMedia(constraints).then(onGetUserMediaSuccess).catch(onGetUserMediaError);
}

function init()
{
	createBuffers();
	createTexture();
	createProgram();
}

function render()
{
	gl.useProgram(program);

	bindBuffers();

	updateTexture();

	bindTexture();

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

	window.requestAnimationFrame(render);
}

function createBuffers()
{
	// Vertex buffer.
	var vertices = [1, 1, 0, 1, -1, 0, -1, -1, 0, -1, 1, 0];
	vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	// Index buffer.
	var indices = [0, 1, 2, 0, 2, 3];
	indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	// Texture coordinate buffer.
	var textureCoordinates = [1, 0, 1, 1, 0, 1, 0, 0];
	textureCoordinateBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function bindBuffers()
{
	// Vertex buffer.
	var positionAttribute = gl.getAttribLocation(program, "aPosition");
	var size = 3;
	var type = gl.FLOAT;
	var normalized = false;
	var stride = 0;
	var offset = 0;
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.vertexAttribPointer(positionAttribute, size, type, normalized, stride, offset);
	gl.enableVertexAttribArray(positionAttribute);

	// Index buffer.
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	// Texture coordinate buffer.
	var textureCoordinateAttribute = gl.getAttribLocation(program, "aTextureCoordinate");
	var size = 2;
	var type = gl.FLOAT;
	var normalized = false;
	var stride = 0;
	var offset = 0;
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
	gl.vertexAttribPointer(textureCoordinateAttribute, size, type, normalized, stride, offset);
	gl.enableVertexAttribArray(textureCoordinateAttribute);
}

function createTexture()
{
	texture = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D, texture);

	var level = 0;
	var internalFormat = gl.RGBA;
	var width = 1;
	var height = 1;
	var border = 0;
	var format = gl.RGBA;
	var type = gl.UNSIGNED_BYTE;
	var pixels = new Uint8Array([0, 0, 0, 255]);
	gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, pixels);

	// Turn off mips and set wrapping to clamp to edge so it will work regardless of the dimensions of the video.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
}

function updateTexture()
{
	var level = 0;
	var internalFormat = gl.RGBA;
	var format = gl.RGBA;
	var type = gl.UNSIGNED_BYTE;
	gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, format, type, video);
}

function bindTexture()
{
	var frameUniform = gl.getUniformLocation(program, "uFrame");

	// Active texture unit 0.
	gl.activeTexture(gl.TEXTURE0);

	// Bind the texture to texture unit 0.
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Bind the uniform sampler2D to texture unit 0.
	gl.uniform1i(frameUniform, 0);
}

function createShader( source, type )
{
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if( !compiled )
	{
		var log = gl.getShaderInfoLog(shader);
		console.log(log);
		return null;
	}

	return shader;
}

function createProgram()
{
	program = gl.createProgram();

	var vertexShader = createShader(vertexSource, gl.VERTEX_SHADER);
	var fragmentShader = createShader(fragmentSource, gl.FRAGMENT_SHADER);

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);

	gl.linkProgram(program);
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