/**************************************************
 * Nombre:       Tarjeta_Proyectos
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";
import {theme} from "../../Tema";
import Barras_Linea from "../Graficas/Barras_Linea";
import {formatoMoneda} from "../../Utilidades/formatoMoneda";

const Tarjeta_Proyectos = ({item}) => {

    return (
        <Grid2 container size={12}
               sx={{
                   alignItems: 'center',
                   cursor: 'pointer',
                   transition: 'all .2s ease-in-out',
                   borderBottom: 1,
                   borderColor: '#ffffff40',
                   px: 1,
                   backgroundColor: '#ffffff00',
                   borderRadius: 0,
                   '&:hover': {
                       border: 1,
                       borderColor: '#ffffff40',
                       borderRadius: 2,
                       backgroundColor: '#ffffff10',
                   }

               }}
        >

            <Grid2 container size={8} sx={{alignItems: 'center'}}>
                <Grid2 container size={12}>
                    <Typography sx={{color: '#fff', fontSize: 14}}>{item.nombre}</Typography>
                </Grid2>
                <Grid2 container size={12} sx={{marginTop: -0.5}}>
                    <Typography
                        sx={{
                            color: theme.palette.success.main,
                            fontWeight: 500,
                            fontSize: 16
                        }}>{formatoMoneda({number: item.valor})}</Typography>
                </Grid2>
            </Grid2>

            <Grid2 container size={4}>
                <Barras_Linea nombre={'Inversion'} datos={item.datos}/>
            </Grid2>


        </Grid2>
    )

}
export default Tarjeta_Proyectos