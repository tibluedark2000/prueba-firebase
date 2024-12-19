/**************************************************
 * Nombre:       Tarjeta_Perfil
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Avatar, Grid2, Typography} from "@mui/material";
import usuario from '../../../../Recursos/usuario_defecto.jpg'
import {TEXTO, TEXTOCLARO} from "../../../ContantesColor";
import {MailOutline} from "@mui/icons-material";

const Tarjeta_Perfil = () => {

    return (
        <Grid2
            container
            size={12}
            sx={{alignItems: 'center'}}
        >

            <Grid2 size={3}>
                <Avatar src={usuario} sx={{width: 80, height: 80}}/>
            </Grid2>

            <Grid2 container size={9} spacing={0}  sx={{alignItems: 'center', pl: 2}}>

                <Grid2 item size={12}>
                    <Typography sx={{color: TEXTO, fontSize: 14, fontWeight: 500}}> Matheus Anderson</Typography>
                </Grid2>

                <Grid2 item size={12}>
                    <Typography sx={{color: TEXTOCLARO, fontSize: 14, fontWeight: 500}}> Designer</Typography>
                </Grid2>

                <Grid2 item size={1}>
                    <MailOutline
                        sx={{width: 16, height: 16, fill: TEXTOCLARO, marginTop: 0.5 }}/>
                </Grid2>

                <Grid2 item size={11}>
                    <Typography sx={{
                        color: TEXTOCLARO,
                        fontSize: 14,
                        fontWeight: 500,
                        pl: 0.5
                    }}> info@modernize.com</Typography>
                </Grid2>


            </Grid2>


        </Grid2>
    )

}
export default Tarjeta_Perfil