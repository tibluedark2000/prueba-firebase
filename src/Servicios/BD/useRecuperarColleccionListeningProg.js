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


const useRecuperarColleccionListeningProg = ({
                                                 col,
                                                 numero = 10,
                                                 orden = "fecha",
                                                 direccion = "asc",
                                                 wheres = [],
                                                 adaptador = null,
                                                 orders = null
                                             }) => {
    const [data, setData] = useState([])
    const [mas, setMas] = useState(true);
    const [error, setError] = useState(null)
    const [ultimo, setUltimo] = useState('');


    /*******************************************************
     * Nombre: cargar mas
     * Descripcion : carga mas docuentos partiendo del ultimo
     * documento cargado
     * Librerias: firebase web 9
     *
     * Autor: Luis Rosero
     ******************************************************/
    const cargarMas = (e) => {

        // e.preventDefault()

        const q = query(collection(fire, col), orders === null ? orderBy(orden, direccion) : orders, limit(numero), ...wheres, startAfter(ultimo))
        onSnapshot(q, snap => {

            if (snap.size > 0) {
                setUltimo(snap.docs[snap.size - 1])
                snap.forEach((docs) => {
                    let obj = docs.data();

                    if (adaptador !== null) {
                        obj = adaptador(docs.data())
                    }

                    if (data.find(element => element !== obj)) {
                        setData((arr) => arr.concat(obj));
                    }
                })
                setMas(true)
            } else {
                setError("Coleccion Vacia")
                setMas(false)
            }
        })
    }


    useEffect(() => {

        setData([])
        const q = query(collection(fire, col), orders === null ? orderBy(orden, direccion) : orders, limit(numero), ...wheres)
        onSnapshot(q, snap => {
            if (snap.size > 0) {
                setData([])
                setUltimo(snap.docs[snap.size - 1])

                snap.forEach((docs) => {
                    let obj = docs.data();

                    if (adaptador !== null) {
                        obj = adaptador(docs.data())
                    }

                    if (!obj.admin) {
                        setData((arr) => arr.concat(obj));
                    }

                })

                setMas(true)


            } else {
                setError("Colecion Vacia")
                setMas(false)
            }
        })

    }, [wheres, orders])


    return (
        {
            data,
            mas,
            error,
            cargarMas,
            setMas,
            setData,

        }
    )
}

export default useRecuperarColleccionListeningProg;