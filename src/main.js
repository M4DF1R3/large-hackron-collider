import { isColliding, handleWallCollision } from "./collision.js";
import { Atom } from "./atom.js";

//set up scene
const scene = new THREE.Scene();

//set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const rho = 200;
let theta = 0;
let phi = Math.PI / 2;
camera.position.z = rho;

//set up light source
var light = new THREE.AmbientLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

//set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//add walls box
const wallSize = 150;
const wall_box = new THREE.BoxGeometry(wallSize, wallSize, wallSize);
const wallMaterial = new THREE.MeshMatcapMaterial({ color: "#bbbbbb", transparent: true, opacity: 0.5 });
const walls = new THREE.Mesh(wall_box, wallMaterial);
scene.add(walls);

//add 2 spheres
const geometry = new THREE.SphereGeometry(10, 32, 16);
const atomMaterial = new THREE.MeshMatcapMaterial({ color: "cyan" });
const sphere1 = new Atom(geometry, atomMaterial, new THREE.Vector3(0.5, 0, 0));
const sphere2 = new Atom(geometry, atomMaterial, new THREE.Vector3(0.5, 0, 0))
scene.add(sphere1);
scene.add(sphere2);



// rotates the camera
function moveCamera() {
    theta += 0.002;
    // phi += 0.002;
    camera.position.x = rho * Math.sin(phi) * Math.cos(theta);
    camera.position.y = rho * Math.cos(phi);
    camera.position.z = rho * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(0, 0, 0);
}

sphere1.position.x = -15;
sphere2.position.x = 15;
// animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    moveCamera();

    handleWallCollision(sphere1, walls);
    handleWallCollision(sphere2, walls);

    sphere1.update();
    sphere2.update();
}
animate();
