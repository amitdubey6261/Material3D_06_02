import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { createMaterialFromJSON, createMaterialFromJSONForSofa } from "../DynamicMaterials/CreateMaterial";
import { ydoc } from "./Collab";

const ymap1 = ydoc.getMap('Mat-Map1');
const ymap2 = ydoc.getMap('Mat-Map2');
const ymap3 = ydoc.getMap('Mat-Map3');

export const collabMaterial1 = (sofa: THREE.Object3D, data: any , spinner : HTMLElement) => {
    // ymap1.set("material_1", "");
    ymap1.observe(async () => {
        spinner.style.display = 'flex' ; 
        const str = ymap1.get('material_1') as string ; 
        try{
            const dmat = await createMaterialFromJSONForSofa(data[str]);
            //@ts-ignore
            sofa.scene.traverse((elem) => {
                //@ts-ignore
                if (elem.type == "Mesh") {
                    //@ts-ignore
                    elem.material = dmat.clone();
                }
            })
            spinner.style.display = 'none' ; 
        }
        catch(e){
            console.log(e) ; 
            spinner.style.display = 'none' ; 
        }

    })
}

export const collabMaterial2 = (sofa: THREE.Object3D, data: any , ktx2Loader : KTX2Loader , spinner : HTMLElement ) => {
    // ymap2.set("material_2", "");

    ymap2.observe(async () => {
        spinner.style.display = 'flex' ; 
        const str = ymap2.get('material_2') as string ; 

        try{
            const dmat = await createMaterialFromJSON(data[str] , ktx2Loader );
            //@ts-ignore
            sofa.scene.traverse((elem) => {
                //@ts-ignore
                if (elem.type == "Mesh") {
                    //@ts-ignore
                    elem.material = dmat.clone();
                }
            })
            spinner.style.display = 'none' ; 
        }
        catch(e){
            console.log(e) ; 
            spinner.style.display = 'none' ; 
        }

    })
}

export const collabMaterial3 = (sofa: THREE.Object3D, data: any , ktx2Loader : KTX2Loader , spinner : HTMLElement ) => {
    // ymap3.set("material_3", "");
    ymap3.observe( async () => {
        spinner.style.display = "flex" ; 
        const str = ymap3.get('material_3') as string ; 
        try{
            const dmat = await createMaterialFromJSON(data[str] , ktx2Loader );
            //@ts-ignore
            sofa.scene.traverse((elem) => {
                //@ts-ignore
                if (elem.type == "Mesh") {
                    //@ts-ignore
                    elem.material = dmat.clone();
                }
            })
            spinner.style.display = "none" ; 
        }
        catch(e){
            console.log(e) ; 
            spinner.style.display = "none" ; 
        }
    })
}

export const trigger1 = (thumbnailSelected: string) => {
    ymap1.set("material_1", thumbnailSelected);
}
export const trigger2 = (thumbnailSelected: string) => {
    ymap2.set("material_2", thumbnailSelected);
}
export const trigger3 = (thumbnailSelected: string) => {
    ymap3.set("material_3", thumbnailSelected);
}

export { ymap1 , ymap2 , ymap3 } ; 