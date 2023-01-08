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

/**
 * bounces the atom if it hits a boundary wall
 * 
 * @param {Atom} atom
 * @param {Mesh} walls
 */
export function handleWallCollision(atom, walls) {
    if (Math.abs(atom.position.x) + atom.geometry.parameters.radius > walls.geometry.parameters.width / 2) {
        atom.velocity.x *= -1;
    }
    if (Math.abs(atom.position.y) + atom.geometry.parameters.radius > walls.geometry.parameters.height / 2) {
        atom.velocity.y *= -1;
    }
    if (Math.abs(atom.position.z) + atom.geometry.parameters.radius > walls.geometry.parameters.depth / 2) {
        atom.velocity.z *= -1;
    }
}
