import { ydoc } from "../Collab";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as Y from'yjs' ; 

class CamCollab{
    camera : THREE.PerspectiveCamera ; 
    ydoc : Y.Doc ; 
    active : Boolean ; 
    cammap : Y.Map<any> ; 
    doc : HTMLCanvasElement ; 
    ctrls : any ; 
    f2:any ; 
    f3:any ; 
    f4:any ; 
    constructor( camera: THREE.PerspectiveCamera , canvas : HTMLCanvasElement , camcontrols : OrbitControls ){
        this.camera = camera ; 
        this.camera.position.set(-3.5, 2, 3.5);
        this.doc = canvas ; 
        this.active = false ;  
        this.ctrls = camcontrols ; 
        this.ydoc = ydoc ; 
        this.cammap = this.ydoc.getMap('Cam-Map') ; 

        this.cammap.set('params' , {
            xp : this.camera.position.x , 
            yp : this.camera.position.y , 
            zp : this.camera.position.z , 
            xt : this.ctrls.target.x ,
            yt : this.ctrls.target.y ,
            zt : this.ctrls.target.z ,
            cid : this.ydoc.clientID
        })

        this.f2 = this.wheel.bind(this) ; 
        this.f3 = this.mousedn.bind(this) ; 
        this.f4 = this.mouseup.bind(this) ; 
        this.update() ; 
        this.observe() ; 
    }

    activateSync(){
        this.doc.addEventListener('wheel' , this.f2 ) ; 
        this.doc.addEventListener('pointerdown' , this.f3 ) ; 
        this.doc.addEventListener('pointerup' , this.f4 ) ; 
    }

    mousedn(){
        this.active = true ; 
    }

    mouseup(){
        this.active = false ; 
    }

    wheel(){
        this.cammap.set('params' , {
            xp : this.camera.position.x , 
            yp : this.camera.position.y , 
            zp : this.camera.position.z , 
            xt : this.ctrls.target.x ,
            yt : this.ctrls.target.y ,
            zt : this.ctrls.target.z ,
            cid : this.ydoc.clientID
        })
    }

    deactivateSync(){
        this.doc.removeEventListener('wheel' , this.f2 ) ; 
        this.doc.removeEventListener('pointerdown' , this.f3 ) ; 
        this.doc.removeEventListener('pointerup' , this.f4 ) ; 
    }

    update(){
        if( this.active ){
            this.cammap.set('params' , {
                xp : this.camera.position.x , 
                yp : this.camera.position.y , 
                zp : this.camera.position.z , 
                xt : this.ctrls.target.x ,
                yt : this.ctrls.target.y ,
                zt : this.ctrls.target.z ,
                cid : this.ydoc.clientID
            })
        }
        setTimeout(()=>{
            window.requestAnimationFrame(()=>{
                this.update() ; 
            })
        } , 1000/20 ) ; 
    }

    observe(){
        this.cammap.observe(()=>{
            const props = this.cammap.get('params') ; 
            if( props.cid !== this.ydoc.clientID ){
                this.camera.position.set( props.xp , props.yp , props.zp ) ; 
                this.ctrls.target.set( props.xt , props.yt , props.zt) ; 
                this.ctrls.update() ; 
            }
        })
    }
}

export default CamCollab ; 