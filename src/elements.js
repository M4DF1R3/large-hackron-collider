export const elements = {
    "hydrogen": {"mass": 1, "ea": 1,
        "geometry": new THREE.SphereGeometry(3, 32, 16),
        "material": new THREE.MeshMatcapMaterial({ color:"cyan" })},
        
    "helium": {"mass": 3, "ea": 1, 
        "geometry": new THREE.SphereGeometry(5, 32, 16),
        "material": new THREE.MeshMatcapMaterial({ color:"green" })},
};
