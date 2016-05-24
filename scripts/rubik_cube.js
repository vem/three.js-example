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

var materials = [];
for (var i = 1; i <= 6; ++i)
	materials.push(new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('images/1' + i + '.jpg', {}, function() { renderer.render(scene, camera); }) }));

var box_width = 1;
var boxpos = [
	[.5, .5, .5],
	[.5, .5, .5 - 1],
	[.5 - 1, .5, .5 - 1],
	[.5 - 1, .5, .5],
	[.5, .5 - 1, .5],
	[.5, .5 - 1, .5 - 1],
	[.5 - 1, .5 - 1, .5 - 1],
	[.5 - 1, .5 - 1, .5],
];

var allcube = new THREE.Object3D();

cube = new THREE.Mesh(new THREE.CubeGeometry(box_width, box_width, box_width), new THREE.MeshFaceMaterial(materials));
cube.position.x = .5;
cube.position.y = .5;
cube.position.z = .5;
allcube.add(cube);

cube = new THREE.Mesh(new THREE.CubeGeometry(box_width, box_width, box_width), new THREE.MeshFaceMaterial(materials));
cube.position.x = .5;
cube.position.y = .5;
cube.position.z = .5 - 1;
allcube.add(cube);

cube = new THREE.Mesh(new THREE.CubeGeometry(box_width, box_width, box_width), new THREE.MeshFaceMaterial(materials));
cube.position.x = .5 - 1;
cube.position.y = .5;
cube.position.z = .5 - 1;
allcube.add(cube);

cube = new THREE.Mesh(new THREE.CubeGeometry(box_width, box_width, box_width), new THREE.MeshFaceMaterial(materials));
cube.position.x = .5 - 1;
cube.position.y = .5;
cube.position.z = .5;
allcube.add(cube);

cube = new THREE.Mesh(new THREE.CubeGeometry(box_width, box_width, box_width), new THREE.MeshFaceMaterial(materials));
cube.position.x = .5;
cube.position.y = .5 - 1;
cube.position.z = .5;
allcube.add(cube);

cube = new THREE.Mesh(new THREE.CubeGeometry(box_width, box_width, box_width), new THREE.MeshFaceMaterial(materials));
cube.position.x = .5;
cube.position.y = .5 - 1;
cube.position.z = .5 - 1;
allcube.add(cube);

cube = new THREE.Mesh(new THREE.CubeGeometry(box_width, box_width, box_width), new THREE.MeshFaceMaterial(materials));
cube.position.x = .5 - 1;
cube.position.y = .5 - 1;
cube.position.z = .5 - 1;
allcube.add(cube);

cube = new THREE.Mesh(new THREE.CubeGeometry(box_width, box_width, box_width), new THREE.MeshFaceMaterial(materials));
cube.position.x = .5 - 1;
cube.position.y = .5 - 1;
cube.position.z = .5;
allcube.add(cube);


scene.add(allcube);


var fov = camera.fov;
var zoom = 0.5;

camera.fov = fov * zoom;
camera.updateProjectionMatrix();
renderer.render(scene, camera);



var cubepos = {
	top: [1, 2, 3, 4],
	bottom: [5, 6, 7, 8],
	left: [1, 4, 5, 8],
	right: [2, 3, 6, 7],
	front: [3, 4, 7, 8],
	back: [1, 2, 5, 6],
};

var moveobj = new THREE.Object3D();

var is_moving = false;

function action_cube(movepos, order) {
	if (is_moving) return;
	is_moving = true;

	moveobj = new THREE.Object3D();
	var movecube = cubepos[movepos];
	var mcposs = function() {
		var returnarr = [];
		for (var i = 0; i < boxpos.length; i++) {
			var iplus = i + 1;
			if ($.inArray(iplus, movecube) == -1) continue;
			returnarr.push(boxpos[i]);
		}
		return returnarr;
	}();

	console.log(allcube.children);

	for (var i = allcube.children.length - 1; i >= 0; i--) {
		for (var j = 0; j < mcposs.length; j++) {
			if (
				allcube.children[i] == undefined ||
				allcube.children[i].position.x != mcposs[j][0] ||
				allcube.children[i].position.y != mcposs[j][1] ||
				allcube.children[i].position.z != mcposs[j][2]
			) continue;
			moveobj.add(allcube.children[i]);
		}
	}
	scene.add(moveobj);

	targetX = targetY = targetZ = 0;

	if (movepos == 'top' || movepos == 'bottom') {
		targetY = order == 'asc' ? Math.PI / 2 : -Math.PI / 2;
	}
	if (movepos == 'front' || movepos == 'back') {
		targetX = order == 'asc' ? Math.PI / 2 : -Math.PI / 2;
	}
	if (movepos == 'left' || movepos == 'right') {
		targetZ = order == 'asc' ? Math.PI / 2 : -Math.PI / 2;
	}

	TweenMax.to(moveobj.rotation, 1, {
		x: targetX,
		y: targetY,
		z: targetZ,
		onComplete: function() {
			moveobj.updateMatrixWorld();
			for (var i = moveobj.children.length - 1; i >= 0; i--) {
				var tmpcube = moveobj.children[i];
				THREE.SceneUtils.detach(moveobj.children[i], moveobj, scene);
				// tmpcube.updateMatrixWorld();
				allcube.add(tmpcube);
			}
			scene.remove(moveobj);
			// scene.updateMatrixWorld();
			is_moving = false;
		}
	});
}

setInterval(function() {
	action_cube(['top', 'bottom', 'left', 'right', 'front', 'back'][fRandomBy(0, 5)], ['asc', 'desc'][fRandomBy(0, 1)]);
}, 100);



console.log(camera.rotation);

function render() {
	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);
	// camera.rotation.x -= 0.01;
}
render();

camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;


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