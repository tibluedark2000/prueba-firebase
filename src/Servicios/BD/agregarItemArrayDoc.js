import {fire} from "../../fire";
import {
    setDoc,
    doc,
    deleteDoc,
    onSnapshot,
    updateDoc,
    writeBatch,
    getDocs,
    collection,
    arrayUnion
} from 'firebase/firestore'

export const agregarItemArrayDoc = (col, id, nombreArray, obj) => {


    return new Promise(resolve => {
        updateDoc(doc(fire, col, id), {[nombreArray]: arrayUnion(obj)}).then((dox) => {
            return resolve({res: true, data: id})
        }).catch((err) => {
            //  alert(err.message)
            return resolve({res: false, data: err.message})
        })
    })

}