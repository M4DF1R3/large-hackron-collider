export class Atom extends THREE.Mesh {
    /**
     * Creates an Atom object
     * 
     * @param {SphereGeometry} geometry 
     * @param {Material} atomMaterial 
     * @param {Vector3} velocity 
     * @param {float} mass 
     * @param {String} name 
     */
    constructor(geometry, atomMaterial, velocity=new THREE.Vector3(0, 0, 0), mass=1, name="") {
        super(geometry, atomMaterial)
        this.velocity = velocity;
        this.mass = mass;
        this.name = name;
        this.collisionState = false;
    }

    get speedSquared() {
        return this.velocity.lengthSq;
    }

    get energy() {
        return 0.5 * this.mass * this.speedSquared;
    }
    
    // integrate
    update() {
        this.position.add(this.velocity);
    }
}