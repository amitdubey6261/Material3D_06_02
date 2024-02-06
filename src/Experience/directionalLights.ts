import * as THREE from 'three' ; 

function addDirectionalLight(scene: THREE.Scene) {
    const directionalLight = new THREE.DirectionalLight(0xf48037, 6);
    directionalLight.name = 'direct_light' ; 
    directionalLight.position.set(5 , 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 20;
    directionalLight.shadow.bias = -0.005;
    directionalLight.shadow.radius = 4;
    directionalLight.visible = false ; 
    scene.add(directionalLight);
    directionalLight.visible= true ; 
}

export { addDirectionalLight }; 