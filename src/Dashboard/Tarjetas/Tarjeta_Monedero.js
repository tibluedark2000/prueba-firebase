/**************************************************
 * Nombre:       Tarjeta_Perfil
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";

const Tarjeta_Monedero = ({titulo, valor=0, difiere=false}) => {

    return (
        <Grid2
            container
            size={12}
            sx={{alignItems: 'center'}}
        >


            <Grid2 container size={12}>
                <Typography sx={{
                    color: '#fff', fontSize: 14, lineHeight: 1.1,

                }}>{titulo}</Typography>
            </Grid2>

            <Grid2 container size={12} sx={{marginTop: difiere ? 1.2 : 0}} >
                <Typography sx={{color: '#ffffff', fontSize: difiere ? 16 : 24, fontWeight: 600}}>{valor}</Typography>
            </Grid2>


        </Grid2>
    )

}
export default Tarjeta_Monedero