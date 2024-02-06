import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { collabMaterial1, collabMaterial2, collabMaterial3, trigger1, trigger2, trigger3 } from "../Collab/CollabMat";

export const processJSON1 = (sofa : THREE.Object3D , className : string , spinner : HTMLElement ) => {
    fetch('MaterialData/SofaMaterials.json').then((res) => res.json()).then((data:any) => {
        const elems = document.querySelectorAll(className);
        collabMaterial1(sofa , data , spinner ) ; 
        Array.from(elems).map((elm) => {
            elm.addEventListener('dragend', async (e: Event) => {
                //@ts-ignore
                const thumbnailSelected = e.target.getAttribute('data-variant');
                trigger1(thumbnailSelected) ; 
            })
        })
    })
}

export const processJSON2 = (sofa : THREE.Object3D , className : string , ktx2Loader : KTX2Loader , spinner : HTMLElement  ) => {
    fetch('MaterialData/SofaMaterials.json').then((res) => res.json()).then((data:any) => {
        const elems = document.querySelectorAll(className);
        collabMaterial2(sofa , data , ktx2Loader ,spinner ) ; 
        Array.from(elems).map((elm) => {
            elm.addEventListener('dragend', async (e: Event) => {
                //@ts-ignore
                const thumbnailSelected = e.target.getAttribute('data-variant');
                // alert(thumbnailSelected)
                trigger2(thumbnailSelected) ; 
            })
        })
        // trigger2("Laminate")
    })
}


export const processJSON3 = (sofa : THREE.Object3D , className : string , ktx2loader : KTX2Loader , spinner : HTMLElement  ) => {
    fetch('MaterialData/SofaMaterials.json').then((res) => res.json()).then((data:any) => {
        const elems = document.querySelectorAll(className);
        collabMaterial3(sofa , data , ktx2loader , spinner ) ; 
        Array.from(elems).map((elm) => {
            elm.addEventListener('dragend', async (e: Event) => {
                //@ts-ignore
                const thumbnailSelected = e.target.getAttribute('data-variant');
                // alert(thumbnailSelected)
                trigger3(thumbnailSelected) ; 
            })
        })
    })

}