/**************************************************
 * Nombre:       Barra_PerfilEmergente
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Grid2, Typography} from "@mui/material";
import {TEXTO} from "../../ContantesColor";
import {theme} from "../../../Tema";
import Tarjeta_Notificaciones from "./SubComponentes/Tarjeta_Notificaciones";


const Barra_Historial = ({historial}) => {

    return (
        <Grid2
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            size={12}
            sx={{width: 364, p: 3}}
        >

            <Grid2 size={9}>
                <Typography sx={{fontWeight: 600, fontSize: 18, color: TEXTO}}>Historial</Typography>
            </Grid2>

            <Grid2 size={3} sx={{marginTop: 0}}>
                <Typography sx={{
                    color: '#fff',
                    backgroundColor: theme.palette.primary.main,
                    px: 1,
                    pt: 0.4,
                    pb: 0.4,
                    textAlign: 'center',
                    borderRadius: 4,
                    fontWeight: 600,
                    fontSize: 14
                }}>Ok</Typography>
            </Grid2>


            <Grid2 container item size={12}>
                {historial.map((item, index) => {
                    return (
                        <Grid2 item size={12} sx={{marginTop: 3}} >
                            <Tarjeta_Notificaciones/>
                        </Grid2>
                    )
                })}
            </Grid2>

            <Grid2 item size={12} sx={{marginTop: 3}} >
                <Button fullWidth variant={'outlined'} > Ver todo le historial</Button>
            </Grid2>


        </Grid2>
    )

}
export default Barra_Historial

const items = [1, 2, 3, 4, 5]

