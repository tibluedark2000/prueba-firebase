/**************************************************
 * Nombre:       Perfil_Proyectos
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";
import Tarjeta_Perfil from "../Tarjetas/Tarjeta_Perfil";
import Lista_Proyectos from "./SubComponentes/Lista_Proyectos";
import {useContext} from "react";
import {usuarioContext} from "../../App";

const Perfil_Proyectos = () => {
    const cData = useContext(usuarioContext)

    return (
        <Grid2
            container
            size={12}
            sx={{
                p: 3,
                background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)',
                border: 1,
                borderColor: '#ffffff40',
                borderRadius: 3,
                pb: 4
            }}
        >

            <Grid2 container size={12}>
                <Tarjeta_Perfil usuario={cData?.usuario} />
            </Grid2>

            <Grid2 container size={12} sx={{borderTop: 1, borderColor: '#ffffff40', pt: 3, mt: 3}}>
                <Typography sx={{color: '#fff', fontWeight: 500, fontSize: 18}}>Proyectos Activos</Typography>
            </Grid2>

            <Grid2 container size={12} sx={{marginTop: 1}}>
                <Lista_Proyectos/>
            </Grid2>


        </Grid2>
    )

}
export default Perfil_Proyectos