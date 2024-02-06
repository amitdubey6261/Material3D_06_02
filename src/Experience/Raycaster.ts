import * as THREE from 'three' ; 

class Raycaster{
    raycaster : THREE.Raycaster; 
    pointer : THREE.Vector2 ; 
    renderer : THREE.WebGLRenderer ; 
    scene : THREE.Scene ; 
    camera : THREE.PerspectiveCamera ; 
    conatiner : HTMLCanvasElement ; 
    intersects : any ; 

    constructor(renderer : THREE.WebGLRenderer , scene : THREE.Scene , Camera : THREE.PerspectiveCamera ){
        this.renderer = renderer ; 
        this.scene = scene ; 
        this.camera = Camera ; 
        this.raycaster = new THREE.Raycaster() ; 
        this.pointer = new THREE.Vector2() ; 
        this.conatiner = document.querySelector("#canvas-container") as HTMLCanvasElement ;

        window.addEventListener('pointermove' , (e:any)=>{
            this.pointer.x = (e.clientX / this.conatiner.clientWidth) * 2 - 1;
            this.pointer.y = -(e.clientY / this.conatiner.clientHeight) * 2 + 1;
        })
    }

    intersection(){
        // console.log(this.intersects[0].object.name );
        if( this.intersects.length > 0 ){
            return this.intersects[0].object.name ; 
        }
        else{
            return "" ; 
        }
    }

    render(){
        
        this.raycaster.setFromCamera( this.pointer , this.camera ) ; 
        this.intersects = this.raycaster.intersectObjects( this.scene.children );
        // this.intersection()
        // console.log(this.intersects[0].object.name);
        // for ( let i = 0; i < this.intersects.length; i ++ ) {
            //@ts-ignore
            // this.intersects[ 0 ].object.material.wireframe = true ; 
            // setTimeout(()=>{
                //@ts-ignore
                // this.intersects[ 0 ].object.material.wireframe = false ; 
            // } , 100 )
    
        // }
    }
}

export { Raycaster } ; 