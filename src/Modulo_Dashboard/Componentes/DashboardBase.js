/**************************************************
 * Nombre:       DashboardBase
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2} from "@mui/material";
import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import MenuLateral from "./MenuLateral";

const DashboardBase = ({secciones = [], seccionesPerfil=[], salir, seccionesID=[]}) => {
    const [seccionesProcesadas, setSeccionesProcesadas] = useState([])


    const obtenerCategorias = (secc) => {

        let categorias = secc.map((it) => it.categoria)
        let categoriasSet = new Set(categorias)
        return Array.from(categoriasSet)

    }

    const procesarSecciones = (cats, seccs) => {

        let arr = []

        for (let i = 0; i < cats.length; i++) {
            let obj = {
                categoria: cats[i]
            }
            let seccionesInternas = []
            for (let j = 0; j < seccs.length; j++) {

                let seccion = seccs[j]
                if (seccion.categoria === cats[i]) {
                    seccionesInternas.push(seccs[j])
                }
            }
            obj.secciones = seccionesInternas
            arr.push(obj)

        }


        return arr
    }

    useEffect(() => {
        let categorias = obtenerCategorias(secciones)
        let seccProcesadas = procesarSecciones(categorias, secciones)
        setSeccionesProcesadas(seccProcesadas)
    }, [secciones]);
    return (
        <Grid2
            container
            size={12}
        >

            <BrowserRouter>
               <MenuLateral seccionesProcesadas={seccionesProcesadas} secciones={secciones} seccionesPerfil={seccionesPerfil} salir={salir} seccionesID={seccionesID}/>
            </BrowserRouter>

        </Grid2>
    )

}
export default DashboardBase