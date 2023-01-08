import { isColliding, handleWallCollision } from "./collision.js";
import { Atom } from "./atom.js";
import { camera, updateCameraPosition, onMouseMove, onMouseUp, onMouseDown } from "./camera.js";

//set up scene
const SCENE = new THREE.Scene();

//set up light source
var light = new THREE.AmbientLight(0xffffff);
light.position.set(0, 1, 1).normalize();
SCENE.add(light);

//set up RENDERER
const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

//add walls box
const WALLSIZE = 150;
const WALL_BOX = new THREE.BoxGeometry(WALLSIZE, WALLSIZE, WALLSIZE);
const EDGES = new THREE.EdgesGeometry(WALL_BOX);
const LINE = new THREE.LineSegments(EDGES, new THREE.LineBasicMaterial({ color: 0xffffff }));
const WALLMATERIAL = new THREE.MeshMatcapMaterial({ color: "#bbbbbb", transparent: true, opacity: 0.5 });
const WALLS = new THREE.Mesh(WALL_BOX, WALLMATERIAL);
SCENE.add(WALLS);
SCENE.add(LINE);

//add 2 spheres
const ATOM_GEOMETRY = new THREE.SphereGeometry(10, 32, 16);
const ATOM_MATERIAL = new THREE.MeshMatcapMaterial({ color: "cyan" });
const SPHERE1 = new Atom(ATOM_GEOMETRY, ATOM_MATERIAL, new THREE.Vector3(0.5, 0.2, 0));
const SPHERE2 = new Atom(ATOM_GEOMETRY, ATOM_MATERIAL, new THREE.Vector3(0.5, 0, 0.2));
SCENE.add(SPHERE1);
SCENE.add(SPHERE2);


SPHERE1.position.x = -15;
SPHERE2.position.x = 15;

// animation loop
function animate() {
    RENDERER.render(SCENE, camera);

    updateCameraPosition();

    handleWallCollision(SPHERE1, WALLS);
    handleWallCollision(SPHERE2, WALLS);

    SPHERE1.update();
    SPHERE2.update();

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    requestAnimationFrame(animate);
}
animate();
