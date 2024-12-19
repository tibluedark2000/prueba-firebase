import {fire} from "../../fire";
import {setDoc, doc, deleteDoc, onSnapshot, updateDoc, writeBatch, getDocs, collection} from 'firebase/firestore'

export const guardarDoc = (col, obj) => {

    if (!obj.id) {
        let id = new Date().getTime() + col.substr(col.length - 3, col.length).toUpperCase();
        obj.id = id;
    }

    return new Promise(resolve => {
        setDoc(doc(fire, col, obj.id), obj).then((dox) => {
            return resolve({res: true, data: obj.id})
        }).catch((err) => {
            //  alert(err.message)
            return resolve({res: false, data: err.message})
        })
    })

}