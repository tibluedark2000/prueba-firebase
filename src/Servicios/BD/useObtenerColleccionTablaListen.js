import {useEffect, useState} from "react";
import {
    collection,
    endAt,
    getCountFromServer,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,

} from "firebase/firestore";
import {fire} from "../../fire";

export const useObtenerColleccionTablaListen = ({coleccion, filtroInicial = 'fecha', adaptador = null}) => {
    const [numeroFilas, setNumeroFilas] = useState(0)
    const [itemFinal, setItemFinal] = useState('')
    const [page, setPage] = useState(0);
    const [data, setData] = useState([])
    const [filasPagina, setFilasPagina] = useState(10);
    const [filtroEscogido, setFiltroEscogido] = useState(filtroInicial)

    const filasPaginaCambia = (event) => {

        let filas = parseInt(event.target.value)
        setFilasPagina(filas);
        setPage(0);

        const coll = collection(fire, coleccion);

        const q = query(coll, limit(filas), orderBy(filtroEscogido))
        let array = []
        setData(array)
        onSnapshot(q, (snap) => {
            setItemFinal(snap.docs[snap.size - 1].data())
            snap.forEach((docs) => {
                let obj = docs.data();

                if (adaptador !== null) {
                    obj = adaptador(docs.data())
                }
                array.push(obj)
            })
            setData(array)
        })


    };

    const cambiarPagina = (event, nuevaPagina) => {

        const coll = collection(fire, coleccion);
        const getDireccionPagina = () => {
            if (page < nuevaPagina) {
                return startAfter(itemFinal[filtroEscogido])
            } else {
                return endAt(itemFinal[filtroEscogido])
            }
        }


        const q = query(coll, limit(filasPagina), orderBy(filtroEscogido), getDireccionPagina())

        setPage(nuevaPagina);
        let array = []
        setData(array)
        onSnapshot(q, (snap) => {
            setItemFinal(snap.docs[snap.size - 1].data())
            snap.forEach((docs) => {
                let obj = docs.data();

                if (adaptador !== null) {
                    obj = adaptador(docs.data())
                }
                array.push(obj)
            })
            setData(array)
        })

    };


    const props = {
        data,
        cambiarPagina,
        numeroFilas,
        page,
        setPage,
        filasPagina,
        setFilasPagina,
        filtroEscogido,
        setFiltroEscogido,
        filasPaginaCambia
    }


    useEffect(() => {
        setData([])
        setPage(0)
        // numero total de filas
        const coll = collection(fire, coleccion);
        getCountFromServer(coll).then((dox) => {
            setNumeroFilas(dox.data().count)
        })


        const q = query(coll, limit(filasPagina), orderBy(filtroEscogido))

        let array = []
        onSnapshot(q, (snap) => {
            setItemFinal(snap.docs[snap.size - 1].data())
            snap.forEach((docs) => {
                let obj = docs.data();

                if (adaptador !== null) {
                    obj = adaptador(docs.data())
                }
                array.push(obj)

            })
            setData(array)

        })
    }, [filtroEscogido]);
    return {
        props
    }
}