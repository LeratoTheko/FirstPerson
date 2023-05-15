import * as THREE from 'three';

export function Cube() {
    const object1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1),
        new THREE.MeshBasicMaterial({color: '#D32F2F'})
    );
    object1.position.y = 0.251;
    object1.position.x = 0.25;

    //const group = new THREE.Group();
    //group.add()
    return object1;
}