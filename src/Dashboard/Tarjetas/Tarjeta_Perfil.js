/**************************************************
 * Nombre:       Tarjeta_Perfil
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Avatar, Grid2, IconButton, Typography} from "@mui/material";
import {SettingsOutlined} from "@mui/icons-material";
import {useDialogo} from "../../Modulo_dialogos/Hooks/useDialogo";
import Dialogo_Perfil from "../Dialogos/Dialogo_Perfil";
import logo from "../../Recursos/logo_redondo.svg";

const Tarjeta_Perfil = ({usuario}) => {
    const {Dialogo, abrir, cerrar} = useDialogo({Componente: Dialogo_Perfil})

    return (
        <Grid2
            container
            size={12}
            sx={{alignItems: 'center'}}
        >

            <Dialogo/>

            <Grid2 container size={2}>
                <img src={logo} width={40} height={'auto'}/>
            </Grid2>


            <Grid2 container size={8} sx={{pl: 2}}>
                <Grid2 container size={12}>
                    <Typography sx={{
                        color: '#fff', fontSize: 16, lineHeight: 1.1,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        textOverflow: "ellipsis",
                        fontWeight: 500

                    }}>
                        {usuario?.nombre}
                    </Typography>
                </Grid2>

                <Grid2 container size={12}>
                    <Typography sx={{color: '#ffffff90', fontSize: 14}}>
                        {usuario?.correo}
                    </Typography>
                </Grid2>
            </Grid2>

            <Grid2 container size={2} sx={{justifyContent: 'flex-end'}}>
                <IconButton
                    onClick={() => abrir(usuario)}
                >
                    <SettingsOutlined sx={{fill: '#ffffff80', width: 28, height: 28}}/>
                </IconButton>
            </Grid2>

        </Grid2>
    )

}
export default Tarjeta_Perfil