import * as THREE from 'three'

export const addSpotLight = (scene: THREE.Scene) => {
    const _sptLight = new THREE.SpotLight(new THREE.Color(0xffff00) , 0 , 2 , Math.PI / 7 , .5 , 2);
    _sptLight.position.set(1, 1, 1 );
    _sptLight.lookAt(0, 0, 0);
    _sptLight.visible = false;
    scene.add(_sptLight);
    _sptLight.visible = true;

    const spotLightHelper = new THREE.SpotLightHelper(_sptLight , new THREE.Color(0xff0000));
    scene.add(spotLightHelper);
}