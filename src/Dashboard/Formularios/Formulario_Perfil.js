/**************************************************
 * Nombre:       Formulario_Productos
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid} from "@mui/material";

import {AccountCircle, Badge} from "@mui/icons-material";
import IngresoTexto from "../../Modulo_formularios/Componentes/IngresoTexto";
import logo from "../../Recursos/logo_redondo.svg"


const Formulario_Perfil = ({...props}) => {


    return (
        <form noValidate style={{width: '100%'}}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                sx={{p: 1}}
            >


                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    <img src={logo} width={80} height={'auto'}/>
                </Grid>

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    <IngresoTexto Icono={AccountCircle} nombre={'Nombre'} dato={'nombre'}  {...props}
                                  requerido={'El Nombre es requerido'}

                    />
                </Grid>

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    <IngresoTexto Icono={Badge} nombre={'Cc/Nit/Dni'} dato={'cc'}   {...props}

                    />
                </Grid>


            </Grid>
        </form>

    )

}
export default Formulario_Perfil