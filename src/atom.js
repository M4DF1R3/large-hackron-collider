import { elements } from "./elements.js";

export class Atom extends THREE.Mesh {
    // private vars
    #element;

    /**
     * Creates an Atom object
     * 
     * @param {String} name
     * @param {SphereGeometry} geometry 
     * @param {Material} atomMaterial 
     * @param {Vector3} velocity 
     * @param {float} mass 
     */
    constructor(name, geometry, atomMaterial, velocity = new THREE.Vector3(0, 0, 0), mass = 1) {
        super(geometry, atomMaterial)
        this.#element = name;
        this.velocity = velocity;
        this.mass = mass;
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
        this.#element = element;
        this.mass = elements[element].mass;
        this.geometry = elements[element].geometry;
        this.material = elements[element].material;
    }

    get element() {
        return this.#element;
    }

    // integrate
    update() {
        this.position.add(this.velocity);
    }
}