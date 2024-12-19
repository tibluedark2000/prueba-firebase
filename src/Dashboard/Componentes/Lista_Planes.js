/**************************************************
 * Nombre:       Lista_Transacciones
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2} from "@mui/material";
import Tarjeta_Plan from "../Tarjetas/Tarjeta_Plan";
import Cabecera_Plan from "./SubComponentes/Cabecera_Plan";
import {useState} from "react";
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";

const Lista_Planes = ({click,valor}) => {
    const {sCell} = useResponsive()
    return (
        <Grid2 container size={12}>

            <Cabecera_Plan/>
            {items.map((item, index) => {
                return (
                    <Tarjeta_Plan item={item} click={click} valor={valor}/>
                )
            })}
        </Grid2>
    )

}
export default Lista_Planes

const items = [30, 50, 100, 130, 150, 200, 290, 350, 430, 500, 600, 700, 790, 900, 990, 2000, 2900, 3000, 5000]