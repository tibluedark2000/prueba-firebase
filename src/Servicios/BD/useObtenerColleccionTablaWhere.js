import {useEffect, useState} from "react";
import {
    collection,
    endAt,
    getCountFromServer,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    where
} from "firebase/firestore";
import {fire} from "../../fire";

export const useObtenerColleccionTablaWhere = ({
                                                   coleccion,
                                                   filtroInicial = 'fecha',
                                                   dirInicial = 'desc',
                                                   adaptador = null,
                                                   nombreEstado = 'estado',
                                                   wheres = []
                                               }) => {
    const [numeroFilas, setNumeroFilas] = useState(100)
    const [itemFinal, setItemFinal] = useState('Todo')
    const [page, setPage] = useState(0);
    const [data, setData] = useState([])
    const [filasPagina, setFilasPagina] = useState(10);
    const [filtroEscogido, setFiltroEscogido] = useState({propiedad: filtroInicial, direccion: dirInicial})
    const [estado, setEstado] = useState('')
    const [cargar, setCargar] = useState(false)

    const cargarNuevamente = () => {
        setCargar(!cargar)
    }

    const filasPaginaCambia = (event) => {

        let filas = parseInt(event.target.value)
        setFilasPagina(filas);

        setPage(0);

        const coll = collection(fire, coleccion);

        // seteamos where si hay un estado elegido
        let wheres_ = wheres
        if (estado !== 'Todo' && estado !== '') {
            wheres_.push(where(nombreEstado, '==', estado))
        } else {
            wheres_ = wheres
        }

        const q = query(coll, ...wheres_, limit(filas), orderBy(filtroEscogido.propiedad, filtroEscogido.direccion))

        getDocs(q).then((dox) => {
            let array = []
            for (let i = 0; i < dox.docs.length; i++) {
                let obj = dox.docs[i].data()
                if (i === dox.docs.length - 1) {
                    setItemFinal(obj)
                }
                if (adaptador !== null) {
                    obj = adaptador(obj)
                }
                array.push(obj)

            }


            setData(array)

        })


    };

    const cambiarPagina = (event, nuevaPagina) => {

        const coll = collection(fire, coleccion);
        const getDireccionPagina = () => {
            if (page < nuevaPagina) {
                return startAfter(itemFinal[filtroEscogido.propiedad])
            } else {
                return endAt(itemFinal[filtroEscogido.propiedad])
            }
        }

        // seteamos where si hay un estado elegido
        let wheres_ = wheres
        if (estado !== 'Todo' && estado !== '') {
            wheres_.push(where(nombreEstado, '==', estado))
        } else {
            wheres_ = wheres
        }


        const q = query(coll, ...wheres_, limit(filasPagina), orderBy(filtroEscogido.propiedad, filtroEscogido.direccion), getDireccionPagina())

        setPage(nuevaPagina);
        getDocs(q).then((dox) => {
            let array = []
            for (let i = 0; i < dox.docs.length; i++) {
                let obj = dox.docs[i].data()
                if (i === dox.docs.length - 1) {
                    setItemFinal(obj)
                }

                if (adaptador !== null) {
                    obj = adaptador(obj)
                }
                array.push(obj)

            }


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
        filasPaginaCambia,
        estado,
        setEstado,
        nombreEstado
    }


    useEffect(() => {
        setData([])
        setPage(0)
        // numero total de filas
        const coll = collection(fire, coleccion);

        // seteamos where si hay un estado elegido
        let wheres_ = wheres
        if (estado !== 'Todo' && estado !== '') {
            wheres_.push(where(nombreEstado, '==', estado))
        } else {
            wheres_ = wheres
        }


        const q = query(coll, ...wheres_, limit(filasPagina), orderBy(filtroEscogido.propiedad, filtroEscogido.direccion))

        // contamos cuantos documento hay
        getCountFromServer(q).then((dox) => {
            setNumeroFilas(dox.data().count)
        })

        getDocs(q).then((dox) => {
            let array = []
            for (let i = 0; i < dox.docs.length; i++) {
                let obj = dox.docs[i].data()
                if (i === dox.docs.length - 1) {
                    setItemFinal(obj)
                }
                if (adaptador !== null) {
                    obj = adaptador(obj)
                }

                array.push(obj)

            }

            setData(array)

        })
    }, [filtroEscogido, estado, cargar, wheres]);
    return {
        props,
        cargarNuevamente
    }
}