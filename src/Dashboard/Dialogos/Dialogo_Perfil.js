/**************************************************
 * Nombre:       Dialogo_Perfil
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Grid} from "@mui/material";
import {useFormulario} from "../../Modulo_formularios/Hooks/useFormulario";
import Formulario_Perfil from "../Formularios/Formulario_Perfil";
import {actualizarDoc} from "../../Servicios/BD/actualizarDoc";
import {useLoaders} from "../../Modulo_Loaders/Hooks/useLoaders";
import logo from '../../Recursos/logo.svg'

const Dialogo_Perfil = ({datos, cerrar}) => {
    const {props, obtenerEntidad} = useFormulario({valoresDefecto: datos})
    const {Cargador, abrirCargador, cerrarCargador} = useLoaders({logo: logo})


    const guardarDatos = () => {
        obtenerEntidad().then((entidad) => {
            let obj = entidad
            abrirCargador('Actualizando datos')

            actualizarDatos(obj)


        })
    }

    const actualizarDatos = (obj) => {
        actualizarDoc('usuarios', obj.id, {nombre: obj.nombre, cc: obj.cc}).then((dox) => {
            if (dox.res) {
                cerrarCargador()
                alert('Datos Actualizados con exito')
                cerrar()
            }
        })
    }


    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"

        >


            <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start'}}>
                <Formulario_Perfil props={props}/>
            </Grid>


            <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center', marginTop: 1, marginBottom: 1}}>
                <Button
                    onClick={() => guardarDatos()}
                >Guardar Cambios</Button>
            </Grid>

        </Grid>
    )

}
export default Dialogo_Perfil