import {doc, getDoc} from "firebase/firestore";
import {fire} from "../../../fire";

export const obtenerConsecutivo = ({col, id}) => {
    return new Promise(resolve => {
        getDoc(doc(fire, col, id)).then((dox) => {

            let numero = dox.data().numero

            return resolve({res: true, data: numero})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })
    })
}