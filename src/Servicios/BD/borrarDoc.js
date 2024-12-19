import {deleteDoc, doc} from "firebase/firestore";
import {fire} from "../../fire";

export const borrarDoc = (col, id) => {

    return new Promise(resolve => {

        deleteDoc(doc(fire, col, id)).then((dox) => {
            return resolve({res: true, data: null})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })


    })
}