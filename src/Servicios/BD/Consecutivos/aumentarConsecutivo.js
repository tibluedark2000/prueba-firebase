import {collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {fire} from "../../../fire";
import {firebase} from "firebase/firestore";

export const aumentarConsecutivo = ({col, id, actual}) => {
    return new Promise(resolve => {
        let ref = doc(fire, col, id)
        let numero = actual + 1
        updateDoc(ref, {numero: numero}).then((dox) => {
            return resolve({res: true, data: numero})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })

    })
}