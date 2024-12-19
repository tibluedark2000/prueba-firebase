import {doc, updateDoc} from "firebase/firestore";
import {fire} from "../../fire";


export const actualizarDoc = (col, id, datos) => {



    return new Promise(resolve => {
        updateDoc(doc(fire, col, id), datos).then((dox) => {
            return resolve({res: true, data: dox})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })
    })

}