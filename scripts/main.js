var allcube = [];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var axisHelper = new THREE.AxisHelper(5);
scene.add(axisHelper);

var gridHelper = new THREE.GridHelper(10, 1);
scene.add(gridHelper);

for (var i = 0; i < 5; i++) {
	for (var j = 0; j < 5; j++) {
		var geometry = new THREE.CubeGeometry(1, 1, 1);
		var material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
		allcube[i + '_' + j] = new THREE.Mesh(geometry, material);
		allcube[i + '_' + j].position.x = .5 + i;
		allcube[i + '_' + j].position.y = .5;
		allcube[i + '_' + j].position.z = .5 + j;
		scene.add(allcube[i + '_' + j]);
	}
}
var fov = camera.fov,
	zoom = 1.0,
	inc = -0.01;

function render() {
	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);

	camera.fov = fov * zoom;
	camera.updateProjectionMatrix();

	zoom += inc;
	if (zoom <= 0.2 || zoom >= 1.0) {
		inc = -inc;
	}

	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			var cube = allcube[i + '_' + j];
			cube.position.y = fRandomBy(1, 2);
		}
	}
}
render();

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 10;


function fRandomBy(under, over) {
	switch (arguments.length) {
		case 1:
			return parseInt(Math.random() * under + 1);
		case 2:
			return parseInt(Math.random() * (over - under + 1) + under);
		default:
			return 0;
	}
}