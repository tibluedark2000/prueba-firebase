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
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";

const Historial_Transaccion = ({usuario}) => {
    const {sCell} = useResponsive()

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


            <Grid2 container size={12} sx={{pr: sCell ? 0 : 4}}>
                <Typography sx={{color: '#fff', fontSize:  24, fontWeight: 600, lineHeight: 1.1}}>Historial de Transacciones</Typography>
            </Grid2>

            <Grid2 container size={12} sx={{justifyContent: 'flex-end', marginTop: 1}}>
                <Lista_Transacciones idUsuario={usuario.id} />
            </Grid2>


        </Grid2>
    )

}
export default Historial_Transaccion