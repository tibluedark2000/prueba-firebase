import {useEffect, useState} from "react";
import {doc, onSnapshot} from 'firebase/firestore'
import {fire} from "../../fire";


export const useEscucharUsuarioToCorreo = ({correo = null, funcionNoExiste = null}) => {
    const [usuario, setUsuario] = useState(null)
    const [verificando, setVerificando] = useState(false)


    useEffect(() => {

        if (correo !== null) {
            setVerificando(true)
            let id = getID(correo);
            onSnapshot(doc(fire, "usuarios", id), (snap) => {
                if (snap.data()) {
                    setUsuario(snap.data())
                    setVerificando(false)
                } else {
                    if (funcionNoExiste !== null){
                        funcionNoExiste()
                    }
                    setUsuario(null)
                    setVerificando(false)
                }
            })

        } else {
            setUsuario(null)
            setVerificando(false)
        }


    }, [correo])

    return {
        usuario,
        verificando
    }

}


export const getID = (email) => {
    let em = email.replaceAll("@", "_");
    return em.replaceAll(".", "-").toLowerCase();
}