import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const createScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // Set 3D scene's background color to white
    const ambientLight = new THREE.AmbientLight(0xf48037,.25);
    scene.add(ambientLight);
    return scene;
}

const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    return camera;
}

const createOrbitControls = (camera: THREE.PerspectiveCamera, mycanvas: HTMLCanvasElement) => {
    const controls = new OrbitControls(camera, mycanvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;
    return controls;
}

export { createScene, createCamera, createOrbitControls }; 