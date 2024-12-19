/**************************************************
 * Nombre:       Formulario_Inscribirse
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {ButtonBase, Grid, Typography} from "@mui/material";
import IngresoTexto from "../../Modulo_formularios/Componentes/IngresoTexto";
import {AccountCircle, Badge, Lock, Mail, PhoneAndroid, Store} from "@mui/icons-material";
import {theme} from "../../Tema";
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";

const Formulario_Registro = ({...props}) => {


    return (
        <form noValidate style={{width: '100%'}}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start'}}>
                    <IngresoTexto Icono={Mail} nombre={'Correo'} dato={'correo'}
                                  requerido={'El correo es requerido**'} {...props}
                    />
                </Grid>

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start'}}>
                    <IngresoTexto Icono={AccountCircle} nombre={'Nombres y Apellidos'} dato={'nombre'}
                                  requerido={'El nombre es requerido**'} {...props}
                    />
                </Grid>

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start'}}>
                    <IngresoTexto Icono={Lock} nombre={'Contraseña'} dato={'pass'}
                                  {...props} type={'password'}
                    />
                </Grid>

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start'}}>
                    <IngresoTexto Icono={Lock} nombre={'Confirmar Contraseña'} dato={'passDos'}
                                  {...props} type={'password'}
                    />
                </Grid>

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start'}}>

                    <Typography sx={{color: '#8C8FA7', fontSize: 12, fontWeight: 300}}>
                        Al hacer click en el botón registrarme acepta los Términos y Condiciones y es consciente de las
                        Políticas de privacidad de FoxPlor.
                    </Typography>

                </Grid>


            </Grid>
        </form>
    )

}
export default Formulario_Registro