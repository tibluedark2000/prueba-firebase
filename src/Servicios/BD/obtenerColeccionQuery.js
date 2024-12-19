import {doc, getDocs, collection, query, where} from "firebase/firestore";
import {fire} from "../../fire";

export const obtenerColeccionQuery = (query) => {


    return new Promise(resolve => {
        getDocs(query).then((dox) => {

            let arr = []
            for (let i = 0; i < dox.docs.length; i++) {
                arr.push(dox.docs[i].data())
            }

            return resolve({res: true, data: arr})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })
    })

}