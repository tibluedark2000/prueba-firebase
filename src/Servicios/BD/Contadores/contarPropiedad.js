import {collection, query, where, getCountFromServer, getDocs,} from 'firebase/firestore'
import {fire} from "../../../fire";

export const contarPropiedad = ({coleccion, propiedad, valor}) => {
    // 0 es enero


    let col = collection(fire, coleccion)
    const q = query(col,
        where(propiedad, "==", valor));


    return new Promise(resolve => {
        getCountFromServer(q).then((dox) => {
            return resolve({res: true, data: dox.data().count})
        }).catch((err) => {
            return resolve({res: false, data: 0})
        })
    })


}