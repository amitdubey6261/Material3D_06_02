import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ydoc } from "../Collab"

const addDelMap = ydoc.getMap('AddDel');
const addDelSofa1 = ydoc.getMap('2seater');
const addDelSofa2 = ydoc.getMap('3seater');

let sofa3Ori : any = undefined ; 

export const addDelete = (carpet: any) => {
    addDelMap.set("checked", true);
    const specificObjectToggleCheckbox = document.getElementById('specificObjectToggle') as HTMLInputElement;
    specificObjectToggleCheckbox.addEventListener('change', () => {
        const isActivated = specificObjectToggleCheckbox.checked;
        addDelMap.set("checked", isActivated);
    });

    addDelMap.observe(() => {
        const param = addDelMap.get("checked");
        carpet.visible = param;
        //@ts-ignore
        specificObjectToggleCheckbox.checked = param;
    })

}

export const SofaVariant = (scene: THREE.Scene, sofa2: any, sofa2Toggle: HTMLImageElement, sofa3Toggle: HTMLImageElement, loader: GLTFLoader , spinner : HTMLElement) => {

    let states = {
        sofa2: true,
        sofa3: false,
    }

    addDelSofa1.set("visible", states.sofa2);
    addDelSofa2.set("visible2", states.sofa3);

    let sofa3Seater: any = undefined;

    sofa2Toggle.addEventListener('click', () => {
        states.sofa2 = !states.sofa2;
        addDelSofa1.set("visible", states.sofa2);

    })

    addDelSofa1.observe(async() => {
        const visible = addDelSofa1.get("visible");
        //@ts-ignore 
        states.sofa2 = visible;
        if (states.sofa2) {
            sofa2.visible = true;
            if( sofa3Ori != undefined ){
                //@ts-ignore
                sofa3Ori.visible = false ; 
            }
        }
        else {
            sofa2.visible = false;
            if( sofa3Ori == undefined ){
                const _sofa3Ori = await loader.loadAsync('https://d2629xvaofl3d3.cloudfront.net/3seater.glb') ; 
                sofa3Ori = _sofa3Ori.scene ; 
                sofa3Ori.position.copy(sofa2.position) ; 
                sofa3Ori.position.x = .2 ; 
                scene.add( sofa3Ori ) ; 
            }
            sofa3Ori.visible = true ; 
        }
    })

    sofa3Toggle.addEventListener('click', async () => {
        states.sofa3 = !states.sofa3;
        addDelSofa2.set("visible2", states.sofa3);
    })

    addDelSofa2.observe(async () => {
        const visible2 = addDelSofa2.get('visible2');
        //@ts-ignore 
        states.sofa3 = visible2;
        if (states.sofa3) {
            if (sofa3Seater == undefined) {
                spinner.style.display = 'flex' ; 
                const _sofa3Seater = await loader.loadAsync('https://d2629xvaofl3d3.cloudfront.net/Loung_Chair.glb');
                sofa3Seater = _sofa3Seater.scene;
                sofa3Seater.position.y = -.5;
                scene.add(sofa3Seater);
                spinner.style.display = 'none' ; 
            }
            else {
                sofa3Seater.visible = true;
            }
        }
        else {
            if( sofa3Seater !== undefined ){
                sofa3Seater.visible = false;
            }
        }
    })

}

export const SofaVariantSelect = (scene: THREE.Scene, sofa: any, loader: GLTFLoader , spinner : HTMLElement) => {
    const sofa2SeaterBtn = document.getElementById('2Seater') as HTMLImageElement;
    const sofa3SeaterBtn = document.getElementById('3Seater') as HTMLImageElement;
    SofaVariant(scene, sofa, sofa2SeaterBtn, sofa3SeaterBtn, loader , spinner );
}

export {
    addDelMap , 
    addDelSofa1 , 
    addDelSofa2 , 
}