
export class Atom extends THREE.Mesh {
    constructor(geometry, atomMaterial, velocity) {
        super(geometry, atomMaterial)
        this.velocity = velocity;
    }

    update() {
        this.position.add(this.velocity);
    }
}