import * as THREE from 'three' ; 

export const dayLight = ( isDayMode : Boolean , scene : THREE.Scene) =>{

    if( isDayMode ){
        scene.background = new THREE.Color(0xffffff) ; 
        const light = scene.getObjectByName('direct_light') as THREE.DirectionalLight ; 
        try{
            light.visible = true ; 
        }
        catch(e){
            console.log(e);
        }
    }
    else{
        scene.background = new THREE.Color(0x000000) ; 
        const light = scene.getObjectByName('direct_light') as THREE.DirectionalLight ; 
        try{
            light.visible = false ;   
        }
        catch(e){
            console.log(e);
        }
    }
}