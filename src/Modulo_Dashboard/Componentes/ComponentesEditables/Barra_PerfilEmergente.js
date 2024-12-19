/**************************************************
 * Nombre:       Barra_PerfilEmergente
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Divider, Grid2, Typography} from "@mui/material";
import {TEXTO} from "../../ContantesColor";
import Tarjeta_Perfil from "./SubComponentes/Tarjeta_Perfil";
import {AccountCircle} from "@mui/icons-material";
import TarjetaSecciones from "../SubComponentes/TarjetaSecciones";

const Barra_PerfilEmergente = ({seccionesPerfil}) => {

    return (
        <Grid2
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            size={12}
            sx={{width: 364, p: 3}}
        >

            <Grid2 size={12}>
                <Typography sx={{fontWeight: 600, fontSize: 18, color: TEXTO}}>User Profile</Typography>
            </Grid2>

            <Grid2 size={12} sx={{marginTop: 2}}>
                <Tarjeta_Perfil/>
            </Grid2>

            <Grid2 item size={12} sx={{marginTop: 3}}>
                <Divider color={'#fcfcfc'} sx={{width: '100%'}}/>
            </Grid2>


            <Grid2 item size={12}  >
                {seccionesPerfil.map((item, index) => {
                    return (
                        <Grid2 item size={12} sx={{marginTop: 2}}>
                            <TarjetaSecciones item={item}/>
                        </Grid2>

                    )
                })}
            </Grid2>

            <Grid2 item size={12} sx={{marginTop: 2}} >
                <Button fullWidth variant={'outlined'} >Log Out</Button>
            </Grid2>

        </Grid2>
    )

}
export default Barra_PerfilEmergente

