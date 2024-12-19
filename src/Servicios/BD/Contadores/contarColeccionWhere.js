import {collection, query, where, getCountFromServer,} from 'firebase/firestore'
import {fire} from "../../../fire";

export const contarColeccionWhere = ({coleccion, wheres = []}) => {
    // 0 es enero


    let col = collection(fire, coleccion)
    const q = query(col, {...wheres});




    return new Promise(resolve => {
        getCountFromServer(q).then((dox) => {
            console.log(dox)
            return resolve({res: true, data: dox.data().count})
        }).catch((err) => {
            console.log('Error', err)
            return resolve({res: false, data: 0})
        })
    })


}