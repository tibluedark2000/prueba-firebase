import {signOut, createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import {auth} from "../../fire";

export const funCrearUsuario = (corr, pass) => {


    return new Promise(resolve => {

        createUserWithEmailAndPassword(auth, corr, pass).then((dox) => {

            return resolve({res: true, data: "ok"})

        }).catch((err) => {

            return resolve({res: false, data: err.message})
        })

    })

}