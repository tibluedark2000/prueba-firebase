/**************************************************
 * Nombre:       useGetColleccion Hook
 * Descripcion:  consulta una coleccion de firestore y
 * devuelve progresivamente los resultados
 *
 * props:   col -> nombre de coleccion
 *          numero -> numero de objetos por consulta
 *          orden -> clave del orden que se seguira
 *          direccion -> direccion del orden
 *          where -> [] de wheres (firestore)
 * Libreria: firebase web 9
 *
 * Tiempo:     2 Hr
 **************************************************/
import {useEffect, useState} from 'react';
import {collection, limit, onSnapshot, orderBy, query, startAfter} from 'firebase/firestore'
import {fire} from "../../fire";



const useRecuperarColleccionListeningToda = ({col, orden = "fecha", direccion = "asc", wheres = []}) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)


    useEffect(() => {

        const q = query(collection(fire, col), orderBy(orden, direccion), ...wheres)
        onSnapshot(q, snap => {
            if (snap.size > 0) {
                setData([])
                snap.forEach((docs) => {
                    let obj = docs.data();
                    setData((arr) => arr.concat(obj));


                })

            } else {
                setError("Colecion Vacia")

            }
        })

    }, [])

    return (
        {
            data,
            error,


        }
    )
}

export default useRecuperarColleccionListeningToda;