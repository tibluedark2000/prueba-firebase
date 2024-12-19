/**************************************************
 * Nombre:       Seccion_Dashboard
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Grid2} from "@mui/material";
import Perfil_Proyectos from "../Componentes/Perfil_Proyectos";
import Deposito_Dinero from "../Componentes/Deposito_Dinero";
import Historial_Transaccion from "../Componentes/Historial_Transaccion";
import Historial_Soporte from "../Componentes/Historial_Soporte";

const Seccion_Soporte = () => {

    return (

        <Grid2 container size={12} sx={{justifyContent: 'cebter'}}>


            <Grid2
                container
                size={12}
                spacing={4}
                sx={{alignItems: 'flex-start', maxWidth: '1400px', px: 3}}
            >

                <Grid2 container size={8}>
                    <Grid2 container size={12}>
                        <Button>Solicitar Soporte</Button>
                    </Grid2>
                    <Grid2 container size={12}>
                        <Historial_Soporte/>
                    </Grid2>
                </Grid2>


                <Grid2 container size={4}>
                    <Perfil_Proyectos/>
                </Grid2>


            </Grid2>

        </Grid2>
    )

}
export default Seccion_Soporte