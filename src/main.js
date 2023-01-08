import { isColliding, elasticCollision, handleWallCollision } from "./collision.js";
import { Atom } from "./atom.js";
import { camera, updateCameraPosition, onMouseMove, onMouseUp, onMouseDown, onMouseWheel } from "./camera.js";

// set up the scene
const SCENE = new THREE.Scene();

// set up RENDERER
const RENDERER = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: "high-performance",
});
RENDERER.setPixelRatio(window.devicePixelRatio * 0.5);
RENDERER.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(RENDERER.domElement);

// add walls box
const WALLSIZE = 150;
const WALL_BOX = new THREE.BoxGeometry(WALLSIZE, WALLSIZE, WALLSIZE);
const EDGES = new THREE.EdgesGeometry(WALL_BOX);
const LINE = new THREE.LineSegments(EDGES, new THREE.LineBasicMaterial({ color: 0xffffff }));
const WALLMATERIAL = new THREE.MeshMatcapMaterial({ color: "#bbbbbb", transparent: true, opacity: 0.5 });
const WALLS = new THREE.Mesh(WALL_BOX, WALLMATERIAL);
SCENE.add(WALLS, LINE);

// add spheres (particles)
const ATOM_GEOMETRY = new THREE.SphereGeometry(10, 32, 16);
const ATOM_MATERIAL = new THREE.MeshMatcapMaterial({ color: "cyan" });
const NUM_OF_ATOMS = 2;
let atoms = [];
for (let i = 0; i < NUM_OF_ATOMS; i++) {
    atoms.push(new Atom(ATOM_GEOMETRY, ATOM_MATERIAL, new THREE.Vector3(1, 0, 0)));
    SCENE.add(atoms[i]);
}
atoms[0].position.x = -30;
atoms[0].mass = 5;
atoms[1].position.x = 30;


// animation loop
let run = true;
function animate() {
    RENDERER.render(SCENE, camera);

    updateCameraPosition();

    // check if any of the atoms are hitting the walls
    atoms.forEach(atom => {
        handleWallCollision(atom, WALLS);
        atom.update();
    });

    // check each pair of atoms for collision
    for (let i = 0; i < NUM_OF_ATOMS; i++) {
        for (let j = i + 1; j < NUM_OF_ATOMS; j++) {
            if (isColliding(atoms[i], atoms[j])) {
                elasticCollision(atoms[i], atoms[j]);
            }
        }
    }

    if (run) {
        requestAnimationFrame(animate);
    }
}
animate();

// event listeners
window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('wheel', onMouseWheel)
window.addEventListener("keydown", (key) => {
    // option to stop program by pressing 'p'
    if (key.code == "KeyP") {
        run = false;
    };
});