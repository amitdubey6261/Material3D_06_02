import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';

import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';
import * as THREE from 'three';

const createComposer = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
    //Anti Aliasing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    return composer;
}

export { createComposer };


export default class CustomPostProcessing {
    scene: THREE.Scene;
    camera: THREE.Camera;
    composer: any;
    renderer: THREE.WebGLRenderer;
    size: any;
    renderPass: any;
    postprocessingMap: any;
    effectFXAA: any;
    taaRenderPass: any;
    ssaaRenderPass: any;
    SMAApass: any;
    ssaoPass: any;
    saoPass: any;
    outlinePass: any;
    constructor(scene: THREE.Scene, camera: THREE.Camera, composer: any, renderer: THREE.WebGLRenderer) {
        this.scene = scene;
        this.camera = camera;
        this.composer = composer;
        this.renderer = renderer;
        this.size = {
            width: renderer.domElement.getBoundingClientRect().width,
            height: renderer.domElement.getBoundingClientRect().height,
        };
        this.postprocessingMap = {};
        const postprocessingCheckboxes = document.querySelectorAll(
            '.customPostprocessing'
        );
        Array.from(postprocessingCheckboxes).forEach((checkBox) => {
            checkBox.addEventListener('click', (e) => {
                //@ts-ignore
                const selectedPostProcessing = this.postprocessingMap[e.target.id];
                //@ts-ignore
                if (e.target.checked) {
                    composer.addPass(selectedPostProcessing);
                } else {
                    composer.removePass(selectedPostProcessing);
                }
            });
        });
        this.renderPass = new RenderPass(scene, this.camera);
        composer.addPass(this.renderPass);
        this.effectFXAA = new ShaderPass(FXAAShader);
        this.postprocessingMap.FXAA_C = this.effectFXAA;
        this.effectFXAA.uniforms.resolution.value.set(
            1 / this.size.width,
            1 / this.size.height
        );
        this.taaRenderPass = new TAARenderPass(scene, this.camera);
        this.taaRenderPass.sampleLevel = 1;
        this.postprocessingMap.TAA_C = this.taaRenderPass;

        this.ssaaRenderPass = new SSAARenderPass(scene, this.camera);
        this.postprocessingMap.SSAA_C = this.ssaaRenderPass;

        this.SMAApass = new SMAAPass(
            this.size.width * 0.1 * this.renderer.getPixelRatio(),
            this.size.height * 0.1 * this.renderer.getPixelRatio()
        );
        this.postprocessingMap.SMAA_C = this.SMAApass;

        this.ssaoPass = new SSAOPass(
            scene,
            this.camera,
            this.size.width,
            this.size.height
        );
        this.postprocessingMap.SSAO_C = this.ssaoPass;

        //@ts-ignore
        this.saoPass = new SAOPass(scene, this.camera, false, true);
        this.postprocessingMap.SAO_C = this.saoPass;

        const gammaCorrectinoPass = new ShaderPass(GammaCorrectionShader);
        composer.addPass(gammaCorrectinoPass);

        this.outlinePass = new OutlinePass(
            new THREE.Vector2(this.size.width, this.size.height),
            this.scene,
            this.camera
        );

        composer.addPass(this.taaRenderPass);
        composer.addPass(this.outlinePass);
    }

}

