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

const Formulario_Login = ({...props}) => {

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
                    <IngresoTexto Icono={Lock} nombre={'Contraseña'} dato={'pass'}
                                  {...props} type={'password'}
                    />
                </Grid>

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-end'}}>
                    <ButtonBase onClick={() => props.recuperar()}>
                        <Typography sx={{color: theme.palette.primary.main, fontSize: 14}}>¿Has olvidado tu
                            contraseña?</Typography>
                    </ButtonBase>
                </Grid>


            </Grid>
        </form>
    )

}
export default Formulario_Login