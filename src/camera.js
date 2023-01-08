// set up camera
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// coords 
let rho = 200;
let phi = Math.PI / 2;
let theta = Math.PI / 2;

// mouse commands
let isMouseDown = false;
let mouseDownX = 0;
let mouseDownY = 0;
let lastMouseX = 0;
let lastMouseY = 0;

// set camera position
export const updateCameraPosition = () => {
    rho = Math.max(150, Math.min(500, rho));
    camera.position.x = rho * Math.sin(phi) * Math.cos(theta);
    camera.position.y = rho * Math.cos(phi);
    camera.position.z = rho * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(0, 0, 0);
};

// mouse event listners
export function onMouseWheel(event){
  rho += event.deltaY * 0.1;
}

export function onMouseDown(event) {
    isMouseDown = true;
    mouseDownX = event.clientX;
    mouseDownY = event.clientY;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
}

export function onMouseUp(event) {
    isMouseDown = false;
}

export function onMouseMove(event) {
    if (isMouseDown) {
        theta += (event.clientX - lastMouseX) * 0.01;
        phi += (event.clientY - lastMouseY) * 0.01;

        // limit the range of phi
        phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
    }
}
