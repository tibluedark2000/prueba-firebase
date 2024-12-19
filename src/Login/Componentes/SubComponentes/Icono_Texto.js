/**************************************************
 * Nombre:       Icono_Texto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";

const Icono_Texto = ({icono, texto}) => {

    return (
        <Grid2
            container
            size={12}
        >

            <Grid2
                container
                size={{xs: 2, sm: 2, md: 1}}
            >
                {icono}


            </Grid2>
            <Grid2
                container
                size={{xs: 10, sm: 10, md: 11}}
            >
                <Typography sx={{color: '#fff'}}>
                    {texto}
                </Typography>


            </Grid2>

        </Grid2>
    )

}
export default Icono_Texto