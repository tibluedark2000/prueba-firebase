import {doc, getDoc} from "firebase/firestore";
import {fire} from "../../fire";

export const obtenerDoc = (col, id) => {


    return new Promise(resolve => {
        getDoc(doc(fire, col, id)).then((dox) => {
            return resolve({res: true, data: dox.data()})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })
    })

}