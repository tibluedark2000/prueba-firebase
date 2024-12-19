import {signOut, createUserWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
import {auth} from "../../fire";

export const funRecuperarContrasena = (corr) => {



    return new Promise(resolve => {

        if (corr){
            sendPasswordResetEmail(auth, corr).then((dox) => {

                return resolve({res: true, data: "ok"})

            }).catch((err) => {

                return resolve({res: false, data: err.message})
            })
        }else{
            return resolve({res: false, data: "ingresar correo valido"})
        }



    })

}