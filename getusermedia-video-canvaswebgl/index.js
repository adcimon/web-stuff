var video, canvas, gl;
var vertexBuffer, indexBuffer, textureCoordinateBuffer;
var texture;
var unit = 0;
var program;

var vertexSource = `
attribute vec3 a_position;
attribute vec2 a_texcoord;

varying vec2 v_texcoord;

void main()
{
	gl_Position = vec4(a_position, 1.0);
	v_texcoord = a_texcoord;
}
`;

var fragmentSource = `
precision mediump float;

varying vec2 v_texcoord;

uniform sampler2D u_frame;

void main()
{
	gl_FragColor = texture2D(u_frame, v_texcoord);
}
`;

var constraints = {
	audio: false,
	video: true,
};

window.addEventListener('load', main);

function main() {
	video = document.getElementById('video');
	canvas = document.getElementById('canvas');
	gl = canvas.getContext('webgl');

	initialize();

	video.addEventListener('canplay', onCanPlay);

	window.navigator.mediaDevices.getUserMedia(constraints).then(onGetUserMediaSuccess).catch(onGetUserMediaError);
}

function initialize() {
	createBuffers();
	createTexture();
	createProgram();

	useProgram();
	bindBuffers();
	setUniforms();
}

function render() {
	updateTexture();

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

	window.requestAnimationFrame(render);
}

function createBuffers() {
	// Vertex buffer.
	const vertices = [1, 1, 0, 1, -1, 0, -1, -1, 0, -1, 1, 0];
	vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	// Index buffer.
	const indices = [0, 1, 2, 0, 2, 3];
	indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	// Texture coordinate buffer.
	const textureCoordinates = [1, 0, 1, 1, 0, 1, 0, 0];
	textureCoordinateBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function bindBuffers() {
	// Vertex buffer.
	const positionAttribute = gl.getAttribLocation(program, 'a_position');
	let size = 3;
	let type = gl.FLOAT;
	let normalized = false;
	let stride = 0;
	let offset = 0;
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.vertexAttribPointer(positionAttribute, size, type, normalized, stride, offset);
	gl.enableVertexAttribArray(positionAttribute);

	// Index buffer.
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

	// Texture coordinate buffer.
	const textureCoordinateAttribute = gl.getAttribLocation(program, 'a_texcoord');
	size = 2;
	type = gl.FLOAT;
	normalized = false;
	stride = 0;
	offset = 0;
	gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordinateBuffer);
	gl.vertexAttribPointer(textureCoordinateAttribute, size, type, normalized, stride, offset);
	gl.enableVertexAttribArray(textureCoordinateAttribute);
}

function createTexture() {
	texture = gl.createTexture();

	// Active the texture unit.
	gl.activeTexture(gl.TEXTURE0 + unit);

	// Bind the texture to the texture unit.
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Turn off mip maps and set wrapping to clamp to edge so it will work regardless of the dimensions of the video.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	const target = gl.TEXTURE_2D;
	const level = 0;
	const internalFormat = gl.RGBA;
	const width = 1;
	const height = 1;
	const border = 0;
	const format = gl.RGBA;
	const type = gl.UNSIGNED_BYTE;
	const pixels = new Uint8Array([0, 0, 0, 255]);
	gl.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
}

function updateTexture() {
	const target = gl.TEXTURE_2D;
	const level = 0;
	const internalFormat = gl.RGBA;
	const format = gl.RGBA;
	const type = gl.UNSIGNED_BYTE;
	gl.texImage2D(target, level, internalFormat, format, type, video);
}

function createShader(source, type) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (!compiled) {
		const log = gl.getShaderInfoLog(shader);
		console.log(log);
		return null;
	}

	return shader;
}

function createProgram() {
	program = gl.createProgram();

	const vertexShader = createShader(vertexSource, gl.VERTEX_SHADER);
	const fragmentShader = createShader(fragmentSource, gl.FRAGMENT_SHADER);

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);

	gl.linkProgram(program);
}

function useProgram() {
	gl.useProgram(program);
}

function setUniforms() {
	const uniform = gl.getUniformLocation(program, 'u_frame');

	// Set the uniform to the texture unit.
	gl.uniform1i(uniform, unit);
}

function onCanPlay(event) {
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	window.requestAnimationFrame(render);
}

function onGetUserMediaSuccess(stream) {
	video.srcObject = stream;
}

function onGetUserMediaError(error) {
	alert(error);
}
