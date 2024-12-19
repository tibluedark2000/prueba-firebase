/**************************************************
 * Nombre:       Tarjeta_Transaccion
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";
import {ArrowRight} from "@mui/icons-material";
import {theme} from "../../Tema";
import {formatoMoneda} from "../../Utilidades/formatoMoneda";
import {formatoFecha} from "../../Utilidades/formatoFecha";
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";

const Tarjeta_Transaccion = ({item}) => {
    const {sCell} = useResponsive()

    return (
        <Grid2 container size={12}
               sx={{borderBottom: 1, borderColor: '#ffffff40', px: sCell ? 0 : 2, py: 1}}
        >

            <Grid2 container size={{xs: 4, sm: 3, md: 3}}>
                <Grid2 container size={3} sx={{justifyContent: 'flex-start'}}>
                    <ArrowRight sx={{fill: theme.palette.primary.main}}/>
                </Grid2>
                <Grid2 container size={9} sx={{justifyContent: 'flex-start'}}>
                    <Typography sx={{color: '#fff', fontSize: sCell ? 14 : 16}}> {formatoMoneda({number: item.valor, decimales: 2})}</Typography>
                </Grid2>
            </Grid2>


            <Grid2 container size={{xs: 4, sm: 3, md: 3}} >
                <Typography sx={{color: '#fff', fontSize: sCell ? 14 : 16}}>{item.tipo}</Typography>
            </Grid2>

            <Grid2 container size={{xs: 4, sm: 3, md: 3}} sx={{justifyContent: sCell ? 'flex-end' : 'flex-start'}}  >
                <Typography sx={{color: item.estado === 'Pendiente' || item.estado === 'Por Ingresar'  ? theme.palette.primary.main : '#fff', fontSize: sCell ? 14 : 16}}>{item.estado}</Typography>
            </Grid2>

            <Grid2 container size={{xs: 6, sm: 3, md: 3}} sx={{justifyContent: sCell ? 'flex-start' : 'flex-end'}}>
                <Typography sx={{color: '#fff', fontSize: sCell ? 14 : 16}}>{formatoFecha(item.fecha)}</Typography>
            </Grid2>


        </Grid2>
    )

}
export default Tarjeta_Transaccion