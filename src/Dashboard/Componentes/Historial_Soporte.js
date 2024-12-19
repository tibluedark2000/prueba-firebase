/**************************************************
 * Nombre:       Balance_Acciones
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";
import Lista_Transacciones from "./Lista_Transacciones";
import Lista_Soporte from "./Lista_Soporte";

const Historial_Soporte = () => {

    return (
        <Grid2 container size={12}
               sx={{
                   border: 1,
                   borderColor: '#ffffff50',
                   borderRadius: 3,
                   p: 3,
                   alignItems: 'center',
                   justifyContent: 'flex-end',
                   background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)',
               }}
        >


            <Grid2 container size={12} sx={{pr: 4}}>
                <Typography sx={{color: '#fff', fontSize: 24, fontWeight: 600}}>Peticione de Soporte</Typography>
            </Grid2>

            <Grid2 container size={12} sx={{justifyContent: 'flex-end'}}>
                <Lista_Soporte/>
            </Grid2>


        </Grid2>
    )

}
export default Historial_Soporte