import {collection, query, where, getAggregateFromServer, sum} from 'firebase/firestore'
import {fire} from "../../../fire";
import {isObject} from "chart.js/helpers";

export const contarPropiedadMultipleSumaWheres = ({
                                                      coleccion,
                                                      propiedades=[],
                                                      wheres = []
                                                  }) => {


    let col = collection(fire, coleccion)
    const q = query(col, ...wheres);


    let obtenerPropiedadesSuma = () => {

        let obj= {}

        for (let i = 0 ; i < propiedades.length; i++){
            let propiedad = propiedades[i]
            obj[propiedad] = sum(propiedad)
        }

        return obj

    }


    return new Promise(resolve => {
        getAggregateFromServer(q, obtenerPropiedadesSuma()).then((dox) => {
            console.log(dox.data())
            return resolve({res: true, data: dox.data()})
        }).catch((err) => {
            console.log(err.message)
            return resolve({res: false, data: err.message})
        })
    })


}