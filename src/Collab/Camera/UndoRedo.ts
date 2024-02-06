// import { ymap1, ymap2, ymap3 } from "../CollabMat";
import { ymap1, ymap2, ymap3 } from "../CollabMat";
import { dayLightMap } from "../DayLight";
import { addDelMap, addDelSofa1, addDelSofa2 } from "./CollAddDelete";
import { lightMap } from "./CollLights";
import * as Y from 'yjs'

export const undoManager = () =>{
    const undomanager = new Y.UndoManager([lightMap , addDelMap , addDelSofa1 , addDelSofa2 , ymap1 , ymap2 , ymap3 , dayLightMap]) ; 
    const undoBtn = document.querySelector('#Undo') as HTMLInputElement ; 
    const redoBtn = document.querySelector('#Redo') as HTMLInputElement ;
    undoBtn.addEventListener('click' , () =>{
        if( undomanager.canUndo() ){
            undomanager.undo() ; 
        }
        else{
            alert( 'stop undo') ; 
        }
    }) 
    redoBtn.addEventListener('click' , ()=>{
        if( undomanager.canRedo() ){
            undomanager.redo() ; 
        }
        else{
            alert( 'stop redo') ;
        }
    })
}