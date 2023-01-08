/**
 * checks whether sphere meshes are overlapping
 * 
 * @param {Atom} atom1
 * @param {Atom} atom2 
 * @returns {boolean} true if the spheres are colliding
 */
export function isColliding(atom1, atom2) {
    // create bounding boxes for the spheres
    const box1 = new THREE.Box3().setFromObject(atom1);
    const box2 = new THREE.Box3().setFromObject(atom2);

    // update the bounding boxes
    box1.setFromObject(atom1);
    box2.setFromObject(atom2);

    // check if the bounding boxes intersect
    if (box1.intersectsBox(box2)) {
        // perform a more precise check to see if the spheres are colliding
        const distSquared = atom1.position.distanceToSquared(atom2.position);
        const radiusSum = atom1.geometry.parameters.radius + atom2.geometry.parameters.radius;
        if (distSquared < radiusSum * radiusSum) {
            if (atom1.collisionState || atom2.collisionState) {
                return false;
            } else {
                console.log("collision!");
                atom1.collisionState = true;
                atom2.collisionState = true;
                return true;
            }
        }
    } else {
        atom1.collisionState = false;
        atom2.collisionState = false;
        return false;
    }
}


/**
 * 
 * @param {Atom} atom1 
 * @param {Atom} atom2 
 */
export function elasticCollision(atom1, atom2) {
    // from https://physics.stackexchange.com/questions/681396/elastic-collision-3d-eqaution

    // get relative position & velocity
    let dr = new THREE.Vector3();
    dr.subVectors(atom2.position, atom1.position);
    let dv = new THREE.Vector3();
    dv.subVectors(atom2.velocity, atom1.velocity);

    // get normal vector
    let normal = dr.clone();
    normal.normalize();

    // reduced mass
    let m_eff = 1 / (1 / atom1.mass + 1 / atom2.mass);

    // impact speed
    let v_imp = -1 * normal.dot(dv);

    // impulse magnitude (COR = 1)
    let j = 2 * m_eff * v_imp

    // delta-v 
    let dv1 = normal.clone().multiplyScalar(-j / atom1.mass);
    let dv2 = normal.clone().multiplyScalar(j / atom2.mass);

    // update velocities
    atom1.velocity.add(dv1);
    atom2.velocity.add(dv2);

    // atom1.element = "helium";
    // atom2.element = "helium";

    // forcibly separate spinners
    if (atom1.collisionHistory[0] - atom1.collisionHistory[29] > 20 ||
        atom2.collisionHistory[0] - atom2.collisionHistory[29] > 20) {
        atom1.position.sub(dr);
        atom2.position.add(dr);
    }
}


/**
 * bounces the atom if it hits a boundary wall
 * 
 * @param {Atom} atom
 * @param {Mesh} walls
 */
export function handleWallCollision(atom, walls, desiredTemp) {
    let scalingFactor = Math.sqrt(((0.0004 * desiredTemp - atom.energy) / 2 + atom.energy) / atom.energy);
    if (atom.position.x + atom.geometry.parameters.radius > walls.geometry.parameters.width / 2) {
        atom.velocity.x = -Math.abs(atom.velocity.x) * scalingFactor;
    } else if (atom.position.x - atom.geometry.parameters.radius < -walls.geometry.parameters.width / 2) {
        atom.velocity.x = +Math.abs(atom.velocity.x) * scalingFactor;
    }

    if (atom.position.y + atom.geometry.parameters.radius > walls.geometry.parameters.height / 2) {
        atom.velocity.y = -Math.abs(atom.velocity.y) * scalingFactor;
    } else if (atom.position.y - atom.geometry.parameters.radius < -walls.geometry.parameters.height / 2) {
        atom.velocity.y = +Math.abs(atom.velocity.y) * scalingFactor;
    }

    if (atom.position.z + atom.geometry.parameters.radius > walls.geometry.parameters.depth / 2) {
        atom.velocity.z = -Math.abs(atom.velocity.z) * scalingFactor;
    } else if (atom.position.z - atom.geometry.parameters.radius < -walls.geometry.parameters.depth / 2) {
        atom.velocity.z = +Math.abs(atom.velocity.z) * scalingFactor;
    }
}
