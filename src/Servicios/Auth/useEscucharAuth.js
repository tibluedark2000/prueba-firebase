import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, } from 'firebase/auth'
import { auth } from "../../fire";


export const useEscucharAuth = () => {
    const [email, setEmail] = useState(null)
    const [img, setImg] = useState(null)
    const [verificando, setVerificando] = useState(false)
    const [data, setData] = useState(null)



    useEffect(() => {
        setVerificando(true)
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
                setEmail(user.email)
                setImg(user.photoURL)
                setData(user)
                setVerificando(false)
            } else {
                setEmail(null)
                setVerificando(false)
                setImg(null)
            }
        });
    }, [])

    return {
        email,
        img,
        verificando,
        data
    }

}