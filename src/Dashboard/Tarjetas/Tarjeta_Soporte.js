/**************************************************
 * Nombre:       Tarjeta_Transaccion
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";

const Tarjeta_Soporte = () => {

    return (
        <Grid2 container size={12}
               sx={{borderBottom: 1, borderColor: '#ffffff40', px: 2, py: 1}}
        >

            <Grid2 container size={3} sx={{justifyContent: 'flex-start'}}>
                <Typography sx={{color: '#fff'}}>15 / Sep / 2024</Typography>
            </Grid2>

            <Grid2 container size={1}>
                <Typography sx={{color: '#fff'}}># 30</Typography>
            </Grid2>

            <Grid2 container size={6}>
                <Typography sx={{color: '#fff'}}>Aumento por accion</Typography>
            </Grid2>

            <Grid2 container size={2} sx={{justifyContent: 'flex-end'}}>
                <Typography sx={{color: '#fff'}}>Abierto</Typography>
            </Grid2>


        </Grid2>
    )

}
export default Tarjeta_Soporte