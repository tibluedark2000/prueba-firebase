/**************************************************
 * Nombre:       Tarjeta_Perfil
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Avatar, Grid2, Typography } from "@mui/material";
import usuario from '../../../../Recursos/usuario_defecto.jpg'
import { TEXTO, TEXTOCLARO } from "../../../ContantesColor";
import { MailOutline } from "@mui/icons-material";

const Tarjeta_Notificaciones = ({ item }) => {

    const formatDate = (dateString) => {
        // console.log(dateString.seconds);
        // Convertir timestamp a formato de fecha y hora dd/mm/aaaa hh:mm:ss 
        const date = new Date(dateString.seconds * 1000);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    };

    return (
        <Grid2
            container
            size={12}
            sx={{
                alignItems: 'center',
                background: item.visto === false ? '#00000040' : '#00000000',
                // Borde redondeado en la parte de arriba
                borderTopRightRadius: '10px',
                // borderRadius: 2,
                borderBottom: '1px solid #00000088',
                // borderColor: '#00000020',
                // backdropFilter: 'blur(10px)',
                px: 1,
                py: 1,
                marginTop: '3px'
            }}
        >

            <Grid2 size={1}>
                <Avatar src={usuario} sx={{ width: 30, height: 30 }} />
            </Grid2>

            <Grid2 container size={11} spacing={0} sx={{ alignItems: 'center', pl: 3 }}>

                <Grid2 item size={12}>
                    <Typography sx={{ color: TEXTO, fontSize: 12, fontWeight: 600 }}> {item.mensaje}</Typography>
                </Grid2>




                <Grid2 item size={12} sx={{ marginTop: 0 }} >
                    <Typography sx={{
                        color: TEXTOCLARO,
                        fontSize: 12,
                        fontWeight: 500,
                    }}> {formatDate(item.fecha)}</Typography>
                </Grid2>


            </Grid2>


        </Grid2>
    )

}
export default Tarjeta_Notificaciones