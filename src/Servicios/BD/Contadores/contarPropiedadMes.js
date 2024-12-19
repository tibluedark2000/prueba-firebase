import {collection, query, where, getCountFromServer, } from 'firebase/firestore'
import {fire} from "../../../fire";

export const contarPropiedadMes = ({coleccion, propiedad, mes, year, valor}) => {
    // 0 es enero

    let inicioMes = new Date(year, mes, 1)
    let finMes = new Date(year, mes, 31, 23, 59)

    let col = collection(fire, coleccion)
    const q = query(col,
        where(propiedad, "==", valor),
        where('fecha', ">", inicioMes),
        where('fecha', "<", finMes));


    return new Promise(resolve => {
        getCountFromServer(q).then((dox) => {
            return resolve({res: true, data: dox.data().count})
        }).catch((err) => {
            console.log('Error',err)
            return resolve({res: false, data: 0})
        })
    })


}