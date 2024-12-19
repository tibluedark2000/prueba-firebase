/**************************************************
 * Nombre:       Perfil_Proyectos
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, Typography} from "@mui/material";
import {useFormulario} from "../../Modulo_formularios/Hooks/useFormulario";
import Formulario_Deposito from "../Formularios/Formulario_Deposito";
import {LoadingButton} from "@mui/lab";
import {useEffect, useState} from "react";
import {CRIPTOS} from "../../Modulo_BotonCripto/Constantes";
import {guardarDoc} from "../../Servicios/BD/guardarDoc";
import {obtenerColeccionQuery} from "../../Servicios/BD/obtenerColeccionQuery";
import {collection, query, where} from "firebase/firestore";
import {fire} from "../../fire";
import Datos_Finales_Deposito from "./SubComponentes/Datos_Finales_Deposito";
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";
import {theme} from "../../Tema";


const Detalle_Deposito_QR = ({usuario, valor}) => {
    const {props, obtenerEntidad} = useFormulario({valoresDefecto: {cripto: 'BNB - BINANCE', valor: valor}})
    const {sCell} = useResponsive()
    const [cargando, setCargando] = useState(false)
    const [depositoAbierto, setDepositoAbierto] = useState({})


    const guardarDatos = () => {

        obtenerEntidad().then((entidad) => {

            let indexCripto = CRIPTOS.findIndex((e) => e.nombre === entidad.cripto)

            let cripto = CRIPTOS[indexCripto]

            let datosDeposito = {
                id: new Date().getTime() + 'DEP',
                idUsuario: usuario.id,
                valor: entidad.valor,
                dirOrigen: 'none',
                dirDestino: cripto.llave,
                codAprobacion: '',
                fecha: new Date().getTime(),
                estado: 'Abierto',
                tipo: cripto.token,
                red: cripto.red,
                nombre: usuario.nombre,
                idTransaccion: new Date().getTime() + 'TRA'
            }


            setCargando(true)
            guardarDeposito(datosDeposito)
        })
    }

    const guardarDeposito = (datos) => {

        guardarDoc('depositos', datos).then((dox) => {
            if (dox.res) {
                setDepositoAbierto(datos)
            } else {
                alert('No se puede depositar en este momento, intentelo mas tarde')
            }
            setCargando(false)
        })
    }


    useEffect(() => {
        if (usuario && usuario.id) {
            let q = query(collection(fire, 'depositos'), where('idUsuario', '==', usuario.id), where('estado', '==', 'Abierto'))
            obtenerColeccionQuery(q).then((dox) => {
                if (dox.res && dox.data[0]) {
                    setDepositoAbierto(dox.data[0])
                }
            })
        }
    }, [usuario]);
    return (
        <Grid2
            container
            size={12}
            sx={{
                p: 3,
                background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)',
                border: 1,
                borderColor: valor > 0 ?theme.palette.primary.main :  '#ffffff40',
                borderRadius: 3,
                pb: 3,
                alignItems: 'center'
            }}
            spacing={2}
        >


            <Grid2 container size={{xs: 12, sm: 12, md: 12}} sx={{marginBottom: 0}}>
                <Typography sx={{
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: 600
                }}>{depositoAbierto.id ? 'Finalizar Deposito' : 'Nuevo Deposito'}</Typography>
            </Grid2>

            {depositoAbierto.id ?


                <Grid2 container size={{xs: 12, sm: 12, md: 12}} sx={{marginBottom: 0}}>
                    <Datos_Finales_Deposito datos={depositoAbierto} setDatos={setDepositoAbierto}/>
                </Grid2>

                :

                <>
                    <Grid2 container size={{xs: 12, sm: 9, md: 9}} sx={{marginBottom: 0}}>
                        <Formulario_Deposito props={props}/>
                    </Grid2>

                    <Grid2 container size={{xs: 12, sm: 3, md: 3}}
                           sx={{marginBottom: 0, justifyContent: sCell ? 'flex-end' : 'flex-start'}}>
                        <LoadingButton
                            onClick={() => guardarDatos()}
                            loading={cargando}
                            variant={'contained'}
                        >Siguiente</LoadingButton>
                    </Grid2>
                </>
            }


        </Grid2>
    )

}
export default Detalle_Deposito_QR