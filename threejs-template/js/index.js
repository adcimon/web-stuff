var canvas, renderer;
var scene, camera, controls;
var cube;

window.addEventListener("load", main);
window.addEventListener("resize", resize);

function main()
{
	initialize();
	createScene();
	resize();
	render();
}

function initialize()
{
	canvas = window.document.getElementById("canvas");

	renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

	camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
	camera.position.z = 2;

	controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function createScene()
{
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0.2, 0.2, 0.2);

	let geometry = new THREE.CubeGeometry(1, 1, 1);
	let material = new THREE.MeshBasicMaterial();
	material.color = new THREE.Color(new THREE.Color(0, 0, 0));
	material.wireframe = true;
	cube = new THREE.Mesh(geometry, material);
	scene.add(cube);
}

function resize()
{
	let width = window.innerWidth;
	let height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	renderer.setSize(canvas.width, canvas.height);

	camera.aspect = canvas.width / canvas.height;
	camera.updateProjectionMatrix();
}

function render()
{
	cube.rotation.y += 0.01;

	controls.update();

	renderer.render(scene, camera);

	window.requestAnimationFrame(render);
}
