import {doc, updateDoc, writeBatch} from "firebase/firestore";
import {fire} from "../../fire";


export const actualizarDocsMultiples = ({col, arrObjs, datos}) => {



    let batch = writeBatch(fire)

    for (let i = 0; i < arrObjs.length; i++) {
        let obj = arrObjs[i]
        let refe = doc(fire, col, obj.id)
        batch.update(refe, datos)
    }

    return new Promise(resolve => {

        batch.commit().then((dox) => {
            return resolve({res: true, dox})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })
    })


}