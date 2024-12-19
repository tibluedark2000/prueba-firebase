/**************************************************
 * Nombre:       Tarjeta_Transaccion
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";
import {useResponsive} from "../../../Modulo_responsive/Hooks/useResponsive";

const Cabecera_Plan = () => {
    const {sCell} = useResponsive()


    return (
        <Grid2 container size={12}
               sx={{borderBottom: 1, borderColor: '#ffffff40', px: 2, py: 1, alignItems: sCell ? 'flex-end' : 'center'}}
        >

            {!sCell &&
                <Grid2 container size={2}>
                    <Typography sx={{color: '#fff', fontWeight: 800, fontSize: sCell ? 14 : 16}}>Accion</Typography>
                </Grid2>
            }

            <Grid2 container size={{xs: 3, sm: 2, md: 2}}>
                <Typography sx={{color: '#fff', fontWeight: 800, fontSize: sCell ? 14 :16}}>Diario</Typography>
            </Grid2>

            <Grid2 container size={{xs: 3, sm: 2, md: 2}}>
                <Typography sx={{color: '#fff', fontWeight: 800, fontSize: sCell ? 14 :16}}>Semanal</Typography>
            </Grid2>

            <Grid2 container size={{xs: 3, sm: 2, md: 2}}>
                <Typography sx={{color: '#fff', fontWeight: 800, fontSize: sCell ? 14 :16}}>Mensual</Typography>
            </Grid2>

            <Grid2 container size={{xs: 3, sm: 2, md: 2}}sx={{justifyContent: 'flex-start'}}>
                <Typography sx={{color: '#fff', lineHeight: 1.1, textAlign: 'left', fontWeight: 800, fontSize:sCell ? 14 : 16}}>Retorno
                    200% 7-9 Meses</Typography>
            </Grid2>

            {!sCell &&
                <Grid2 container size={2} sx={{justifyContent: 'flex-end'}}>

                </Grid2>
            }


        </Grid2>
    )

}
export default Cabecera_Plan