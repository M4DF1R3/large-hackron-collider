import { isColliding } from "./collision.js";

//set up scene
const scene = new THREE.Scene();

//set up camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const rho = 200;
let theta = 0;
let phi = 0;
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
const sphere1 = new THREE.Mesh(geometry, atomMaterial);
const sphere2 = new THREE.Mesh(geometry, atomMaterial)
let velocity = new THREE.Vector3(3, 4, 0);
scene.add(sphere1);
scene.add(sphere2);


// rotates the camera
function moveCamera() {
    theta += 0.002;
    phi += 0.002;
    camera.position.x = rho * Math.sin(theta) * Math.cos(phi);
    camera.position.y = rho * Math.cos(phi);
    camera.position.z = rho * Math.sin(theta) * Math.sin(phi);
    camera.lookAt(0, 0, 0);
}


let phase = 0
// animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    isColliding(sphere1, sphere2);
    moveCamera();
    sphere1.position.x = -5 + 20 * Math.sin(phase);
    sphere2.position.x = 5 - 20 * Math.sin(phase);

    phase += 0.01
}
animate();
