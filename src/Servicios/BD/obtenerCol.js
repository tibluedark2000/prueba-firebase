import {collection, getDocs} from "firebase/firestore";
import {fire} from "../../fire";

export const obtenerCol = (col) => {


    return new Promise(resolve => {
        getDocs(collection(fire, col)).then((dox) => {

            let arr = []
            dox.docs.forEach((e) => {
                arr.push(e.data())
            })

            return resolve({res: true, data: arr})
        }).catch((err) => {
            return resolve({res: false, data: err.message})
        })
    })

}