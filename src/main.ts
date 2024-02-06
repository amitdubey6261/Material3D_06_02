import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import Stats from 'three/examples/jsm/libs/stats.module';
import { modelPaths } from './Experience/Static';
import { createSubsurfaceMaterial, replaceMaterial } from './Experience/SubSurfaceMAterial';
import { createRenderer } from './Experience/renderer';
import { createScene, createCamera, createOrbitControls } from './Experience/scene';
import { createLoaders } from './Experience/loaders';
// import { COllabUI, CreateCollaborationConnection } from './Collab/Collab';
import CamCollab from './Collab/Camera/CollCam';
import { selectModelVariant } from './Experience/selectModelVariant';
import { Raycaster } from './Experience/Raycaster';
import { processJSON1, processJSON2, processJSON3 } from './DynamicMaterials/ProcessJSON';
import { controlLight } from './Collab/Camera/CollLights';
import { SofaVariantSelect, addDelete } from './Collab/Camera/CollAddDelete';
import { undoManager } from './Collab/Camera/UndoRedo';
import { CollbDayLight } from './Collab/DayLight';
import { addDirectionalLight } from './Experience/directionalLights';
import CustomPostProcessing from './Experience/composer';

import { createComposer } from './Experience/composer';

const IP1 = () => {
  const progressContainer = document.querySelector('.spinner-container') as HTMLElement;
  progressContainer.style.display = "block";
  let specificObject: THREE.Object3D | undefined;

  function setupHDRI() {
    const rgbeloader = new RGBELoader();
    rgbeloader.load('hdri/gem_2.hdr', (hdri) => {
      const myhdr = hdri;
      myhdr.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = myhdr;
      scene.background = new THREE.Color("#fff");
    });
  }

  const scene = createScene();
  const camera = createCamera();
  const renderer = createRenderer();
  const composer = createComposer(renderer, scene, camera);

  const mycanvas = renderer.domElement;
  mycanvas.id = "my-canavas";
  let elem = document.querySelector('#canvas-container');
  elem?.appendChild(mycanvas);

  const controls = createOrbitControls(camera, mycanvas);
  const loders = createLoaders(renderer);
  const loader = loders.loader;
  const ktx2loader = loders.ktx2Loader;
  setupHDRI();

  const loadedModelsMap: any = {}
  selectModelVariant(loadedModelsMap);

  function loadModels(index: number) {
    if (index >= modelPaths.length) {
      progressContainer.style.display = 'none';
      renderer.setPixelRatio(window.devicePixelRatio);
      // composer.setSize(renderer.domElement.clientWidth * 0.75, renderer.domElement.clientHeight);
      processJSON1(loadedModelsMap['Sofa'], '.dynamic-mate', progressContainer);
      processJSON2(loadedModelsMap['Floor'], '.dynamic-mate-floor', ktx2loader, progressContainer);
      processJSON3(loadedModelsMap['Carpet'], '.dynamic-mate-carpet', ktx2loader, progressContainer);
      controlLight(scene);
      //@ts-ignore
      addDelete(specificObject);
      undoManager();
      //subsurface
      replaceMaterial(loadedModelsMap['Floor_Lamp'].scene, 'FloorLamp_Cover', createSubsurfaceMaterial())
      SofaVariantSelect(scene, loadedModelsMap['Sofa'].scene, loader, progressContainer);
      addDirectionalLight(scene) ; 
      new CustomPostProcessing(scene , camera , composer , renderer ) ; 
      return;
    }

    const modelPath = modelPaths[index];
    loader.load(modelPath,
      function (gltf) {
        console.log(`Loaded model from ${modelPath}`, gltf);
        let modelName;
        if (modelPath == 'https://d2629xvaofl3d3.cloudfront.net/models_29_01_23/version2/models_29_01_24/Sofa.glb') {
          modelName = 'Sofa';
        }
        else if (modelPath == 'https://d2629xvaofl3d3.cloudfront.net/models_29_01_23/version2/models_29_01_24/Floor.glb') {
          modelName = 'Floor';
        }
        else if (modelPath == 'https://d2629xvaofl3d3.cloudfront.net/models_29_01_23/version2/models_29_01_24/Carpet.glb') {
          modelName = 'Carpet';
        }
        else if (modelPath == 'https://d2629xvaofl3d3.cloudfront.net/models_29_01_23/version2/models_29_01_24/Coffee_Table.glb') {
          modelName = 'Coffee_Table';
        }
        else if (modelPath == 'https://d2629xvaofl3d3.cloudfront.net/models_29_01_23/version2/models_29_01_24/Wall.glb') {
          modelName = 'Coffee_Table';
        }
        else if (modelPath == 'https://d2629xvaofl3d3.cloudfront.net/models_29_01_23/Window.glb') {
          modelName = 'Window';
        }
        else if (modelPath == 'https://d2629xvaofl3d3.cloudfront.net/models_29_01_23/Wall.glb') {
          modelName = 'Wall';
        }
        else {
          modelName = modelPath.split('/')[3].split('.')[0]
        }
        loadedModelsMap[modelName] = gltf

        if (modelName === 'Carpet') {
          specificObject = gltf.scene; // Store the specific object
        }

        gltf.scene.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.receiveShadow = true;
            m.castShadow = true;
          }

          if ((child as THREE.Light).isLight) {
            let l = child as THREE.PointLight;
            l.visible = false;
            l.castShadow = true;
            l.distance = 10;
            l.decay = 4;
            l.power = 400;
            l.shadow.bias = -0.005;
            l.shadow.mapSize.width = 1024;
            l.shadow.mapSize.height = 1024;
            l.shadow.radius = 2.5;
          }
        });

        gltf.scene.position.set(0, -0.5, 0);
        if (modelName == 'Sofa') {
          gltf.scene.position.set(-.2, -.5, 0);
        }
        scene.add(gltf.scene);
        loadModels(index + 1);
      },
      //@ts-ignore
      (xhr) => {
        // console.log(`${modelPath}: ${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.log(`${modelPath}: ${error}`);
        loadModels(index + 1);
      }
    );
  }

  const subsurfaceScatteringMaterial = createSubsurfaceMaterial();
  if (specificObject) {
    replaceMaterial(specificObject, 'FloorLamp_Cover', subsurfaceScatteringMaterial);
  }

  // Start loading models
  loadModels(0);

  CollbDayLight( scene ) ; 


  // const createCollaborationSession = () => {
    // CreateCollaborationConnection();
    const camCollab = new CamCollab(camera, mycanvas, controls);
    camCollab.activateSync();
    // console.log(camCollab);
  // }

  // createCollaborationSession();

  const raycaster = new Raycaster(renderer, scene, camera);

  const stats = new Stats();
  // document.body.appendChild(stats.dom);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
    composer.render();
    stats.update();
  }

  function render() {
    raycaster.render();
    renderer.render(scene, camera);
  }

  animate();
}

IP1();
// const start = async () => {
//   const elem = document.getElementById('RoomCard') as HTMLElement;
//   try {
//     const roomname: string = await COllabUI() as string;
//     elem.style.display = 'none';
//     IP1(roomname);
//   }
//   catch (e) {
//     console.error(e);
//     setTimeout(() => { window.location.reload(); }, 3000);
//   }
// }

// start(); 