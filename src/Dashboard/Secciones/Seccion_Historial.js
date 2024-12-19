/**************************************************
 * Nombre:       Seccion_Dashboard
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Grid2 } from "@mui/material";
import Perfil_Proyectos from "../Componentes/Perfil_Proyectos";
import Historial_Transaccion from "../Componentes/Historial_Transaccion";

const Seccion_Historial = () => {

    return (

        <Grid2 container size={12} sx={{ justifyContent: 'cebter' }}>


            <Grid2
                container
                size={12}
                spacing={4}
                sx={{ alignItems: 'flex-start', maxWidth: '1400px', px: 3 }}
            >

                <Grid2 container size={8}>
                    <Historial_Transaccion />
                </Grid2>


                <Grid2 container size={4}>
                    <Perfil_Proyectos />
                </Grid2>


            </Grid2>

        </Grid2>
    )

}
export default Seccion_Historial