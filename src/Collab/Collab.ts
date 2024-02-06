import * as Y from 'yjs' ; 
import { WebsocketProvider } from 'y-websocket';

const ydoc = new Y.Doc() ;  //shared document

const CreateCollaborationConnection = (room_name : string) =>{
    const provider = new WebsocketProvider('wss://viscommerce.com/server' , room_name , ydoc , {connect : true } );
    console.log(provider);
}

const COllabUI = async () =>{
    const RoomnameInput = document.getElementById('room-name') as HTMLInputElement; 
    const RoomSubmit = document.getElementById('room-submit') as HTMLButtonElement ; 

    const pr = new Promise((res,rej)=>{
        RoomSubmit.addEventListener('click' , ()=>{
            if( RoomnameInput.value !== "" ){
                res( RoomnameInput.value ) ; 
            }
            else{
                rej("Please Enter Roomname !") ; 
            }
        })
    })

    return pr ; 
}

export { ydoc , CreateCollaborationConnection , COllabUI }  ; 