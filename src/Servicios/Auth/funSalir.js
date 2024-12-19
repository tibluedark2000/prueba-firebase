import {signOut} from 'firebase/auth'
import {auth} from "../../fire";

export const funSalir = () => {

    signOut(auth).then((dox) => {

    })
}