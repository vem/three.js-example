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

var allcube = new THREE.Object3D();

cube1 = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshFaceMaterial(materials));
cube1.position.x = .5;
cube1.position.y = .5;
cube1.position.z = .5;
allcube.add(cube1);

cube2 = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshFaceMaterial(materials));
cube2.position.x = .5;
cube2.position.y = .5;
cube2.position.z = .5 - 1;
allcube.add(cube2);

cube3 = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshFaceMaterial(materials));
cube3.position.x = .5 - 1;
cube3.position.y = .5;
cube3.position.z = .5 - 1;
allcube.add(cube3);

cube4 = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshFaceMaterial(materials));
cube4.position.x = .5 - 1;
cube4.position.y = .5;
cube4.position.z = .5;
allcube.add(cube4);

cube5 = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshFaceMaterial(materials));
cube5.position.x = .5;
cube5.position.y = .5 - 1;
cube5.position.z = .5;
allcube.add(cube5);

cube6 = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshFaceMaterial(materials));
cube6.position.x = .5;
cube6.position.y = .5 - 1;
cube6.position.z = .5 - 1;
allcube.add(cube6);

cube7 = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshFaceMaterial(materials));
cube7.position.x = .5 - 1;
cube7.position.y = .5 - 1;
cube7.position.z = .5 - 1;
allcube.add(cube7);

cube8 = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshFaceMaterial(materials));
cube8.position.x = .5 - 1;
cube8.position.y = .5 - 1;
cube8.position.z = .5;
allcube.add(cube8);


scene.add(allcube);


var fov = camera.fov,
	zoom = 0.5;

camera.fov = fov * zoom;
camera.updateProjectionMatrix();
renderer.render(scene, camera);

// cube1.translate(0.5, 0.5, 0.5);

var moveobj = new THREE.Object3D();

var cubepos = {
	top: [1, 2, 3, 4],
	bottom: [5, 6, 7, 8],
	left: [1, 4, 5, 8],
	right: [2, 3, 6, 7],
	front: [3, 4, 7, 8],
	back: [1, 2, 5, 6],
};
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
console.log(cube1);
setTimeout(function() {
	moveobj.add(cube1);
	moveobj.add(cube2);
	moveobj.add(cube3);
	moveobj.add(cube4);
	scene.add(moveobj);

	console.log(moveobj.children[1].position);

	TweenMax.to(moveobj.rotation, 2, {
		y: Math.PI / 2,
		onComplete: function() {
			moveobj.updateMatrixWorld();
			THREE.SceneUtils.detach(moveobj.children[3], moveobj, scene);
			THREE.SceneUtils.detach(moveobj.children[2], moveobj, scene);
			THREE.SceneUtils.detach(moveobj.children[1], moveobj, scene);
			THREE.SceneUtils.detach(moveobj.children[0], moveobj, scene);
			scene.remove(moveobj);
		}
	});

}, 1000);

// function action_cube(movepos) {
// 	// var movepos = 'bottom';
// 	var movecube = cubepos[movepos];
// 	var mcposs = function() {
// 		var returnarr = [];
// 		for (var i = 0; i < boxpos.length; i++) {
// 			var iplus = i + 1;
// 			if ($.inArray(iplus, movecube) == -1) continue;
// 			returnarr.push(boxpos[i]);
// 		}
// 		return returnarr;
// 	}();

// 	console.log('allcube.children', allcube.children);
// 	for (var i = 0; i < allcube.children.length; i++) {
// 		for (var j = 0; j < mcposs.length; j++) {
// 			if (
// 				allcube.children[i].position.x != mcposs[j][0] ||
// 				allcube.children[i].position.y != mcposs[j][1] ||
// 				allcube.children[i].position.z != mcposs[j][2]
// 			) continue;
// 			moveobj.add(allcube.children[i]);
// 		}
// 	}
// 	scene.add(moveobj);
// 	moveobj.rotation.y = 1.5709;

// }


function render() {
	requestAnimationFrame(render);
	controls.update();
	renderer.render(scene, camera);

	// moveobj.rotation.y += 0.01;
	// scene.rotation.y -= 0.01;
	// console.log(moveobj.rotation.y);
	// cube8.rotation.y += 0.1;


	// zoom += inc;
	// if (zoom <= 0.2 || zoom >= 1.0) {
	// 	inc = -inc;
	// }
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