import { isColliding, elasticCollision, handleWallCollision } from "./collision.js";
import { Atom } from "./atom.js";
import { camera, updateCameraPosition, onMouseMove, onMouseUp, onMouseDown, onMouseWheel } from "./camera.js";
import { elements } from "./elements.js";

const SCENE = new THREE.Scene();

// set up renderer
const RENDERER = new THREE.WebGLRenderer({
    antialias: true,
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

// custom randrange function
Math.randomDec = function (low, high) {
    return Math.random() * (high - low) + low;
}

// add spheres (particles)
const NUM_OF_ATOMS = 20;
let atoms = [];
for (let i = 0; i < NUM_OF_ATOMS; i++) {
    atoms.push(new Atom(elements.hydrogen.geometry, elements.hydrogen.material,
        new THREE.Vector3(Math.random(), Math.random(), Math.random()),
        elements.hydrogen.mass, elements.hydrogen.ea));
    atoms[i].position.set(Math.randomDec(-WALLSIZE / 2, WALLSIZE / 2), Math.randomDec(-WALLSIZE / 2, WALLSIZE / 2), Math.randomDec(-WALLSIZE / 2, WALLSIZE / 2));
    SCENE.add(atoms[i]);
}


// animation loop
let run = true;
function animate() {
    RENDERER.render(SCENE, camera);

    updateCameraPosition();

    // check if any of the atoms are hitting the walls
    if (run) {
        // check each pair of atoms for collision
        for (let i = 0; i < NUM_OF_ATOMS; i++) {
            for (let j = i + 1; j < NUM_OF_ATOMS; j++) {
                if (isColliding(atoms[i], atoms[j])) {
                    atoms[i].collisionCount++;
                    atoms[j].collisionCount++;
                    elasticCollision(atoms[i], atoms[j]);
                }
            }
        }

        atoms.forEach(atom => {
            // check if atoms are out of bounds
            handleWallCollision(atom, WALLS);

            // keep tabs on their collision histories to track possible spinners
            atom.collisionHistory.pop();
            atom.collisionHistory.unshift(atom.collisionCount);

            // integrate
            atom.update();
        });
    }

    requestAnimationFrame(animate);
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
window.addEventListener('keydown', (key) => {
    // refresh key
    if (key.code == "KeyR") {
        window.location.reload();
    }
});