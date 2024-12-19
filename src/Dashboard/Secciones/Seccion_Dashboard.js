/**************************************************
 * Nombre:       Seccion_Dashboard
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2} from "@mui/material";
import Perfil_Proyectos from "../Componentes/Perfil_Proyectos";
import Balance_Acciones from "../Componentes/Balance_Acciones";
import Deposito_Dinero from "../Componentes/Deposito_Dinero";
import Historial_Transaccion from "../Componentes/Historial_Transaccion";
import {useContext, useEffect, useState} from "react";
import {usuarioContext} from "../../App";
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";
import {irArriba} from "../../Utilidades/irArriba";
import Detalle_Deposito_QR from "../Componentes/Detalle_Deposito_QR";
import {useParams} from "react-router-dom";

const Seccion_Dashboard = () => {
    const cData = useContext(usuarioContext)
    const parms = useParams()
    const {sCell} = useResponsive()
    const [open, setOpen] = useState(false)
    const [valor,setValor] = useState(0)

    const paraDepositar = (valor) => {

        if (valor > 0){
            setOpen(true)
            setValor(valor)
        }else{
            setOpen(false)
            setValor(0)
        }

    }

    useEffect(() => {
        irArriba()

        if (parms && parms.id){
            paraDepositar(parseInt(parms.id))
        }

    }, [parms]);
    return (

        <Grid2 container size={12} sx={{justifyContent: 'center'}}>


            <Grid2
                container
                size={12}
                spacing={4}
                sx={{alignItems: 'flex-start', maxWidth: '1400px', px: sCell ? 3 : 0}}
            >

                <Grid2 container size={{xs: 12, sm: 12, md: 8}}>
                    <Grid2 container size={12} sx={{zIndex: 2}}>
                        <Deposito_Dinero setOpen={setOpen} open={open} usuario={cData?.usuario}/>
                    </Grid2>

                    {open &&
                        <Grid2 container size={12} sx={{zIndex: 2}}>
                            {/* <Detalle_Deposito usuario={cData?.usuario}/>*/}
                            <Detalle_Deposito_QR usuario={cData?.usuario} valor={valor}/>
                        </Grid2>
                    }

                    <Grid2 container size={12} sx={{marginTop: 0, zIndex: 1}}>
                        <Balance_Acciones usuario={cData?.usuario}/>
                    </Grid2>
                    <Grid2 container size={12}>
                        <Historial_Transaccion usuario={cData.usuario}/>
                    </Grid2>
                </Grid2>


                <Grid2 container size={{xs: 12, sm: 6, md: 4}}>
                    <Perfil_Proyectos usuario={cData?.usuario}/>
                </Grid2>


            </Grid2>

        </Grid2>
    )

}
export default Seccion_Dashboard