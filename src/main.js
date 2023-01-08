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
const CANVAS_DIV = document.getElementById("my-div");
const DESIRED_ASPECT_RATIO = window.innerWidth / window.innerHeight;
const NEW_HEIGHT = (window.innerWidth - 200) / DESIRED_ASPECT_RATIO;
RENDERER.setSize(window.innerWidth - 200, NEW_HEIGHT);
CANVAS_DIV.appendChild(RENDERER.domElement);

// add walls box
const WALLSIZE = 150;
const WALL_BOX = new THREE.BoxGeometry(WALLSIZE, WALLSIZE, WALLSIZE);
const EDGES = new THREE.EdgesGeometry(WALL_BOX);
const LINE = new THREE.LineSegments(EDGES, new THREE.LineBasicMaterial({ color: 0xffffff }));
const WALLMATERIAL = new THREE.MeshMatcapMaterial({ color: "#bbbbbb", transparent: true, opacity: 0.3 });
const WALLS = new THREE.Mesh(WALL_BOX, WALLMATERIAL);
SCENE.add(WALLS, LINE);

// custom randrange function
Math.randomDec = function (low, high) {
    return Math.random() * (high - low) + low;
}

// global atoms vars
let temperature = 0
let numOfAtoms = 0;
let atoms = [];

// animation loop
let run = true;
function animate() {
    RENDERER.render(SCENE, camera);

    updateCameraPosition();

    // check if any of the atoms are hitting the walls
    if (run) {
        // check each pair of atoms for collision
        for (let i = 0; i < numOfAtoms; i++) {
            for (let j = i + 1; j < numOfAtoms; j++) {
                if (isColliding(atoms[i], atoms[j])) {
                    atoms[i].collisionCount++;
                    atoms[j].collisionCount++;
                    elasticCollision(atoms[i], atoms[j]);
                }
            }
        }

        atoms.forEach(atom => {
            // check if atoms are out of bounds
            handleWallCollision(atom, WALLS, temperature);

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

// dynamic atom updating
function update_atoms() {
    let oldNum = atoms.length;
    // remove only as many atoms as needed
    for (let i = 0; i < oldNum - numOfAtoms; i++) {
        SCENE.remove(atoms.pop());
    }
    // add new atoms if there aren't enough
    for (let i = oldNum; i < numOfAtoms; i++) {
        atoms.push(new Atom(elements.hydrogen.geometry, elements.hydrogen.material,
            new THREE.Vector3(Math.randomDec(-0.1, 0.1), Math.randomDec(-0.1, 0.1), Math.randomDec(-0.1, 0.1)),
            elements.hydrogen.mass, elements.hydrogen.ea));
        atoms[i].position.set(Math.randomDec(-WALLSIZE / 2, WALLSIZE / 2), Math.randomDec(-WALLSIZE / 2, WALLSIZE / 2), Math.randomDec(-WALLSIZE / 2, WALLSIZE / 2));
        SCENE.add(atoms[i]);
    }
}

// event listeners
document.getElementsByTagName("canvas")[0].addEventListener('mousedown', onMouseDown);
document.getElementsByTagName("canvas")[0].addEventListener('mouseup', onMouseUp);
document.getElementsByTagName("canvas")[0].addEventListener('mousemove', onMouseMove);
document.getElementsByTagName("canvas")[0].addEventListener('wheel', onMouseWheel)

document.getElementById("submit").addEventListener("click", () => {
    numOfAtoms = Math.floor(Number(document.getElementById("numAtoms").value));
    temperature = Number(document.getElementById("temp").value);
    if (isNaN(numOfAtoms) || isNaN(temperature) || numOfAtoms < 0 || temperature < 0) {
        numOfAtoms = 0;
    }
    update_atoms();
    animate();
});

window.addEventListener('keydown', (key) => {
    // option to stop program by pressing 'p'
    if (key.code == "KeyP") {
        run = false;
    };
    // refresh key
    if (key.code == "KeyR") {
        window.location.reload();
    }
});
