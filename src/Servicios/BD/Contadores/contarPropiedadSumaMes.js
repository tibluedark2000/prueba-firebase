import {collection, query, where, getAggregateFromServer, sum} from 'firebase/firestore'
import {fire} from "../../../fire";

export const contarPropiedadSumaMes = ({coleccion, propiedad, mes, year}) => {
    // 0 es enero

    let inicioMes = new Date(year, mes, 1)
    let finMes = new Date(year, mes, 31, 23, 59)

    let col = collection(fire, coleccion)
    const q = query(col,
        where('fecha', ">", inicioMes.getTime()),
        where('fecha', "<", finMes.getTime()));


    return new Promise(resolve => {
        getAggregateFromServer(q, {total: sum(propiedad)}).then((dox) => {
            return resolve({res: true, data: dox.data().total})
        }).catch((err) => {
            console.log(err.message)
            return resolve({res: false, data: err.message})
        })
    })


}