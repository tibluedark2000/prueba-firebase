/**************************************************
 * Nombre:       Datos_Finales_Deposito
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Divider, Grid, Typography} from "@mui/material";
import {formatoMoneda} from "../../../Utilidades/formatoMoneda";
import {ContentCopy, Delete} from "@mui/icons-material";
import Formulario_Captura_Pantalla from "../../Formularios/Formulario_Captura_Pantalla";
import {useFormulario} from "../../../Modulo_formularios/Hooks/useFormulario";
import {useEffect, useState} from "react";
import QRCode from "qrcode";
import {subirImagenHostingFile} from "../../../Servicios/AlmacenamientoHosting/subirImagenHostingFile";
import {guardarDoc} from "../../../Servicios/BD/guardarDoc";
import {borrarDoc} from "../../../Servicios/BD/borrarDoc";
import {useLoaders} from "../../../Modulo_Loaders/Hooks/useLoaders";
import logo from '../../../Recursos/logo.svg'
import {useResponsive} from "../../../Modulo_responsive/Hooks/useResponsive";
import {useNavigate} from "react-router-dom";

const Datos_Finales_Deposito = ({datos, setDatos}) => {
    const {sCell} = useResponsive()
    const navigate = useNavigate()
    const {props: propsCaptura, obtenerEntidad: obtenerEntidadCaptura} = useFormulario({valoresDefecto: datos})
    const [urlQr, setUrlQr] = useState('')
    const [listo, setListo] = useState(false)
    const {abrirCargador, cerrarCargador, Cargador} = useLoaders({logo: logo})


    const subirDatos = () => {
        obtenerEntidadCaptura().then((entidad) => {
            let obj = entidad
            abrirCargador('Finalizando Deposito...')
            subirImagenHostingFile(entidad.img).then((dox) => {
                if (dox.res) {
                    obj.img = dox.data
                    obj.estado = 'Pendiente'
                    guardarDeposito(obj)

                } else {
                    cerrarCargador()
                }
            })
        })
    }

    const guardarDeposito = (obj) => {
        guardarDoc('depositos', obj).then((dox) => {
            if (dox.res) {
                generarTransaccion(obj)
            } else {
                cerrarCargador()
            }
        })
    }

    const generarTransaccion = (obj) => {
        var datosTrans = {
            id: obj.idTransaccion,
            idUsuario: obj.idUsuario,
            idDeposito: obj.id,
            valor: obj.valor,
            dirOrigen: '',
            dirDestino: obj.dirDestino,
            codAprobacion: '',
            fecha: new Date().getTime(),
            estado: 'Pendiente',
            tipo: 'Deposito',
            red: obj.red,
            nombre: obj.nombre
        }

        guardarDoc('transacciones', datosTrans).then((dox) => {
            if (dox.res) {
                alert("Deposito realizado con exito, la transaccion sera validada en unos minutos");
                setDatos({})
                navigate('/Dashboard/0')
            } else {
                cerrarCargador()
            }
        })
    }

    const borrar = () => {
        abrirCargador('Borrando deposito abierto...')
        borrarDoc('depositos', datos.id).then((dox) => {
            if (dox.res) {
                setDatos({})
                alert('Deposito sin finalizar borrado')
            }
            cerrarCargador()
        })
    }

    const copiarTexto = (texto) => {
        try {
            navigator.clipboard.writeText(texto).then((dox) => {
                alert('Direccion Destino Copiada')
            })
        } catch (err) {
            alert('No se pudo copiar, escane el QR')
        }
    }


    useEffect(() => {
        if (datos.dirDestino) {
            QRCode.toDataURL(datos.dirDestino)
                .then(url => {

                    setUrlQr(url)
                })
                .catch(err => {

                })
        }

    }, [datos]);
    useEffect(() => {
        //console.log(propsCaptura)

        let img = propsCaptura.getValues('img')
        if (img) {
            setListo(true)
        }


    }, [propsCaptura.watch('img')])
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >


            <Cargador/>

            {sCell &&
                <Grid item container lg={6} sm={12} xs={12} sx={{justifyContent: 'flex-start'}}>
                    <Button
                        onClick={() => borrar()}
                        variant={'outlined'} color={'secondary'} startIcon={<Delete/>}>Borrar Deposito</Button>
                </Grid>
            }


            {!sCell &&
                <>
                    <Grid item container lg={4} sm={4} xs={12} sx={{justifyContent: 'center'}}>
                        <Typography sx={{color: '#fff'}}>Monto a transferir</Typography>
                    </Grid>


                    <Grid item container lg={4} sm={4} xs={12} sx={{justifyContent: 'center'}}>
                        <Typography sx={{color: '#fff'}}>{`Direccion Destino ${datos.tipo}`}</Typography>
                    </Grid>

                    <Grid item container lg={4} sm={4} xs={12} sx={{justifyContent: 'center'}}>
                        <Typography sx={{color: '#fff',textAlign: 'center'}}>Captura de pantalla con Hash</Typography>
                    </Grid>
                </>

            }


            <Grid item container lg={4} sm={4} xs={12} sx={{justifyContent: 'flex-start', marginTop: sCell ? 4 : 0}}>

                {sCell &&
                    <Grid item container lg={4} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                        <Typography sx={{color: '#fff'}}>Monto a transferir</Typography>
                    </Grid>
                }

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    <Typography sx={{color: '#fff', fontSize: 32, fontWeight: 600}}>{formatoMoneda({
                        number: datos.valor,
                        decimales: 2
                    })}</Typography>
                </Grid>
                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    <Typography sx={{color: '#fff'}}>{`USD`}</Typography>
                </Grid>

            </Grid>


            <Grid item container lg={4} sm={4} xs={12} sx={{justifyContent: 'flex-start', marginTop: sCell ? 4 : 0}}>


                {sCell &&
                    <Grid item container lg={4} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                        <Typography sx={{color: '#fff'}}>{`Direccion Destino ${datos.tipo}`}</Typography>
                    </Grid>
                }

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center', marginTop: sCell ? 4 : 0}}>
                    <img src={urlQr} width={'62%'} height={'auto'}/>
                </Grid>

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    <Button
                        onClick={() => copiarTexto(datos.dirDestino)}
                        variant={'text'} startIcon={<ContentCopy sx={{width: 20, height: 20}}/>}
                        sx={{fontSize: 14}}
                    >Copiar</Button>
                </Grid>

            </Grid>

            <Grid item container lg={4} sm={4} xs={12} sx={{justifyContent: 'flex-start', marginTop: sCell ? 4 : 0}}>
                {sCell &&
                    <Grid item container lg={4} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                        <Typography sx={{color: '#fff',textAlign: 'center'}}>Captura de pantalla con Hash</Typography>
                    </Grid>
                }

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start'}}>
                    <Formulario_Captura_Pantalla props={propsCaptura}/>
                </Grid>

            </Grid>

            <Grid item container lg={12} sm={12} xs={12}
                  sx={{justifyContent: 'flex-start', marginTop: 2, marginBottom: 3}}>
                <Divider sx={{width: '100%', borderTop: 1, borderColor: '#ffffff50'}}/>
            </Grid>

            {!sCell &&
                <Grid item container lg={6} sm={6} xs={12} sx={{justifyContent: 'flex-start'}}>
                    <Button
                        onClick={() => borrar()}
                        variant={'outlined'} color={'secondary'} startIcon={<Delete/>}>Borrar Deposito</Button>
                </Grid>
            }

            <Grid item container lg={6} sm={6} xs={12} sx={{justifyContent: sCell ? 'center' : 'flex-end'}}>
                <Button disabled={!listo}
                        onClick={() => subirDatos()}
                >Finalizar Deposito</Button>
            </Grid>


        </Grid>
    )

}
export default Datos_Finales_Deposito