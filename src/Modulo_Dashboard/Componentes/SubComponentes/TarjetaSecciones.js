/**************************************************
 * Nombre:       TarjetaSecciones
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Box, Grid2, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {TEXTO, TEXTOCLARO} from "../../ContantesColor";
import {theme} from "../../../Tema";
import {useNavigate} from "react-router-dom";


const TarjetaSecciones = ({item}) => {
    const navigate = useNavigate()

    return (
        <Grid2
            container
            size={12}
            onClick={() => navigate(item.camino)}
            sx={{
                transition: 'all .1s ease-in-out',
                alignItems: 'center',
                color: TEXTO,
                cursor: 'pointer',
                '&:hover':{
                    color: theme.palette.primary.main
                }


        }}
        >

            <Grid2  item size={2} >
                    <item.icono sx={{height: 30, width: 30,backgroundColor: '#f6f9fc', borderRadius: 1.5, p: 1.2, fill: theme.palette.primary.main}}/>
            </Grid2>

            <Grid2 item size={8} sx={{pl: 1.5}} >
                <Grid2 item size={12}>
                    <Typography sx={{ fontWeight: 600, fontSize: 14}}>{item.nombre}</Typography>
                </Grid2>
                <Grid2 item size={12}>
                    <Typography sx={{color: TEXTOCLARO, fontWeight: 400, fontSize: 12}}>{item.descripcion}</Typography>
                </Grid2>

            </Grid2>

        </Grid2>
    )

}
export default TarjetaSecciones