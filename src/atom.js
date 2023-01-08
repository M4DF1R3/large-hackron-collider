import { elements } from "./elements.js";

export class Atom extends THREE.Mesh {
    /**
     * Creates an Atom object
     * 
     * @param {SphereGeometry} geometry 
     * @param {Material} atomMaterial 
     * @param {Vector3} velocity 
     * @param {float} mass 
     * @param {float} ea
     */
    constructor(geometry, atomMaterial, velocity = new THREE.Vector3(0, 0, 0), mass = 1, ea = 1) {
        super(geometry, atomMaterial)
        this.velocity = velocity;
        this.mass = mass;
        this.ea = ea;
        this.collisionState = false;
        this.collisionCount = 0;
        this.collisionHistory = new Array(30).fill(0);
    }

    get speedSquared() {
        return this.velocity.lengthSq();
    }

    get energy() {
        return 0.5 * this.mass * this.speedSquared;
    }

    set element(element) {
        this.mass = elements[element].mass;
        this.ea = elements[element].ea;
        this.geometry = elements[element].geometry;
        this.material = elements[element].material;
    }

    // integrate
    update() {
        this.position.add(this.velocity);
    }
}