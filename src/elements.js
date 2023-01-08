export const elements = {
    "hydrogen": {
        "mass": 2,
        "geometry": new THREE.SphereGeometry(3, 32, 16),
        "material": new THREE.MeshMatcapMaterial({ color: "cyan" }),
        "reactions": {
            "hydrogen": { "becomes": "helium", "produces": "helium", "ea": 3 },
            "oxygen": { "becomes": "helium", "produces": "nitrogen", "ea": 1 },
        }
    },
    "helium": {
        "mass": 3,
        "geometry": new THREE.SphereGeometry(5, 32, 16),
        "material": new THREE.MeshMatcapMaterial({ color: "green" }),
        "reactions": {
        }
    },
    "nitrogen": {
        "mass": 7,
        "geometry": new THREE.SphereGeometry(5, 32, 16),
        "material": new THREE.MeshMatcapMaterial({ color: "red" }),
        "reactions": {
        }
    },
    "oxygen": {
        "mass": 8,
        "geometry": new THREE.SphereGeometry(5, 32, 16),
        "material": new THREE.MeshMatcapMaterial({ color: "yellow" }),
        "reactions": {
            "hydrogen": { "becomes": "nitrogen", "produces": "helium", "ea": 1 },
        }
    },
};

