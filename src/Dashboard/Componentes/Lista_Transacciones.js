/**************************************************
 * Nombre:       Lista_Transacciones
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Grid2} from "@mui/material";
import Tarjeta_Transaccion from "../Tarjetas/Tarjeta_Transaccion";
import useRecuperarColleccionListeningProg from "../../Servicios/BD/useRecuperarColleccionListeningProg";
import {useContext, useEffect, useState} from "react";
import {where} from "firebase/firestore";
import {usuarioContext} from "../../App";

const Lista_Transacciones = () => {
    const cData = useContext(usuarioContext)
    const [wheres, setWheres] = useState([where('idUsuario', '==', 'none')])
    const {data, cargarMas, mas} = useRecuperarColleccionListeningProg({
        col: 'transacciones',
        wheres: wheres,
        orden: 'fecha',
        numero: 5,
        direccion: 'desc'
    })

    useEffect(() => {
      //  console.log(cData)
        if (cData.usuario && cData.usuario.id) {
            setWheres([where('idUsuario', '==', cData.usuario.id)])
        }
    }, [cData]);
    return (
        <Grid2 container size={12}>
            {data.map((item, index) => {
                return (
                    <Tarjeta_Transaccion item={item}/>
                )
            })}

            <Grid2 container size={12} sx={{justifyContent: 'flex-end', marginTop: 2}}>
                {mas &&
                    <Button
                        onClick={() => cargarMas()}
                        variant={"outlined"} color={'secondary'}>Cargas mas movimientos</Button>
                }
            </Grid2>


        </Grid2>
    )

}
export default Lista_Transacciones
