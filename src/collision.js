/**
 * checks whether sphere meshes are overlapping
 * 
 * @param {Mesh} sphere1 
 * @param {Mesh} sphere2 
 * @returns {boolean} true if the spheres are colliding
 */
export function isColliding(sphere1, sphere2) {
    // create bounding boxes for the spheres
    const box1 = new THREE.Box3().setFromObject(sphere1);
    const box2 = new THREE.Box3().setFromObject(sphere2);

    // update the bounding boxes
    box1.setFromObject(sphere1);
    box2.setFromObject(sphere2);

    // check if the bounding boxes intersect
    if (box1.intersectsBox(box2)) {
        // perform a more precise check to see if the spheres are colliding
        const distSquared = sphere1.position.distanceToSquared(sphere2.position);
        const radiusSum = sphere1.geometry.parameters.radius + sphere2.geometry.parameters.radius;
        if (distSquared < radiusSum * radiusSum) {
            console.log("collision!");
            return true;
        }
    }
    return false;
}


// TODO: replace hardcoded temp with wall params
let temp = 150;
function wallCollision(sphere, walls) {
    let width = walls.geometry.parameters.width;
    let height = walls.geometry.parameters.height;
    let depth = walls.geometry.parameters.depth;

    let dir = [1,1,1];
    if (Math.abs(sphere.position.x) + sphere.radius > temp / 2) {
        dir[0]*=-1;
    } else if (Math.abs(sphere.position.y) + sphere.radius > temp / 2) {
        dir[1]*=-1;
    } else if (Math.abs(sphere.position.z) + sphere.radius > temp / 2) {
        dir[2]*=-1;
    }
}

