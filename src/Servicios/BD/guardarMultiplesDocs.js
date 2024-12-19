import {getStorage, ref, uploadBytes, getDownloadURL, pu} from 'firebase/storage'
import {fire, storage} from "../../fire";
import {doc, writeBatch} from "firebase/firestore";

export const guardarMultiplesDocs = (arrObjs = [], coleccion) => {

    //aun no esta probado

    let batch = writeBatch(fire)

    for (let i = 0; i < arrObjs.length; i++) {
        let id = new Date().getTime() + coleccion.substr(coleccion.length - 3, coleccion.length).toUpperCase() + i;
        let obj = arrObjs[i]
        obj.id = id
        let refe = doc(fire, coleccion, id)
        batch.set(refe, obj)
    }

    return new Promise(resolve => {

        batch.commit().then((dox) => {
            return resolve({res: true, dox})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })
    })

}


