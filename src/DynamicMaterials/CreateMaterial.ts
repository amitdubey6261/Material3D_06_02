import * as THREE from 'three';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';

const createMaterialFromJSONForSofa = async (jsonData: any) => {
    const diffuseMap = await new THREE.TextureLoader().loadAsync(jsonData.diffuseMap);
    const glossMap = await new THREE.TextureLoader().loadAsync(jsonData.glossMap);
    const normalMap = await new THREE.TextureLoader().loadAsync(jsonData.normalMap);

    diffuseMap.wrapS = THREE.RepeatWrapping;
    diffuseMap.wrapT = THREE.RepeatWrapping;
    glossMap.wrapS = THREE.RepeatWrapping;
    glossMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;

    //@ts-ignore
    diffuseMap.repeat.set(...jsonData.diffuseMapTiling);
    //@ts-ignore
    glossMap.repeat.set(...jsonData.glossMapTiling);
    //@ts-ignore
    normalMap.repeat.set(...jsonData.normalMapTiling);

    const material = new THREE.MeshPhysicalMaterial({
        metalness: jsonData.metalness,
        roughness: 1 - jsonData.sheenGloss,
        opacity: jsonData.opacity,
        transparent: true,
        map: diffuseMap,
        roughnessMap: glossMap,
        normalMap: normalMap,
        ior: 1,
        sheen: 1,
        sheenRoughness: 1,
        side: jsonData.twoSidedLighting ? THREE.DoubleSide : THREE.FrontSide,
        alphaTest: jsonData.alphaTest,
        depthWrite: jsonData.depthWrite,
        depthTest: jsonData.depthTest,
        color: new THREE.Color(...jsonData.diffuse),
        emissive: new THREE.Color(...jsonData.emissive),
        emissiveIntensity: jsonData.emissiveIntensity,
        aoMap: null,
        aoMapIntensity: 1,
    });

    material.clearcoat = jsonData.clearcoat || 0;
    material.clearcoatRoughness = jsonData.clearcoatRoughness || 0;
    material.reflectivity = jsonData.reflectivity || 0.5;

    return material ; 
}

const createMaterialFromJSON = async (jsonData: any, ktx2loader: KTX2Loader) => {

    const diffuseMap = await ktx2loader.loadAsync(jsonData.diffuseMap);
    const glossMap = await ktx2loader.loadAsync(jsonData.glossMap);
    const normalMap = await ktx2loader.loadAsync(jsonData.normalMap);

    diffuseMap.wrapS = THREE.RepeatWrapping;
    diffuseMap.wrapT = THREE.RepeatWrapping;
    glossMap.wrapS = THREE.RepeatWrapping;
    glossMap.wrapT = THREE.RepeatWrapping;
    normalMap.wrapS = THREE.RepeatWrapping;
    normalMap.wrapT = THREE.RepeatWrapping;

    //@ts-ignore
    diffuseMap.repeat.set(...jsonData.diffuseMapTiling);
    //@ts-ignore
    glossMap.repeat.set(...jsonData.glossMapTiling);
    //@ts-ignore
    normalMap.repeat.set(...jsonData.normalMapTiling);

    const material = new THREE.MeshPhysicalMaterial({
        // metalness: jsonData.metalness,
        // roughness: 1 - jsonData.sheenGloss,
        // opacity: jsonData.opacity,
        // transparent: true,
        map: diffuseMap,
        roughnessMap: glossMap,
        normalMap: normalMap,
        ior: 1,
        roughness: 1,
        // sheen : 1 , 
        // sheenRoughness : 1 , 
        // side: jsonData.twoSidedLighting ? THREE.DoubleSide : THREE.FrontSide,
        // alphaTest: jsonData.alphaTest,
        // depthWrite: jsonData.depthWrite,
        // depthTest: jsonData.depthTest,
        // color: new THREE.Color(...jsonData.diffuse),
        // emissive: new THREE.Color(...jsonData.emissive),
        // emissiveIntensity: jsonData.emissiveIntensity,
        // aoMap: null,
        // aoMapIntensity: 1,
    });

    // material.clearcoat = jsonData.clearcoat || 0;
    // material.clearcoatRoughness = jsonData.clearcoatRoughness || 0;
    // material.reflectivity = jsonData.reflectivity || 0.5;

    return material;
}

export { createMaterialFromJSON, createMaterialFromJSONForSofa }; 