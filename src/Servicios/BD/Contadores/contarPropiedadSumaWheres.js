import {collection, query, where, getAggregateFromServer, sum} from 'firebase/firestore'
import {fire} from "../../../fire";

export const contarPropiedadSumaWheres = ({coleccion, propiedad, wheres=[]}) => {


    let col = collection(fire, coleccion)
    const q = query(col, ...wheres);


    return new Promise(resolve => {
        getAggregateFromServer(q, {total: sum(propiedad)}).then((dox) => {
            return resolve({res: true, data: dox.data().total})
        }).catch((err) => {
            console.log(err.message)
            return resolve({res: false, data: err.message})
        })
    })


}