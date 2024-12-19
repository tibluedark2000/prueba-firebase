/**************************************************
 * Nombre:       Perfil_Proyectos
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Button, Grid2, Typography } from "@mui/material";
import { formatoMoneda } from "../../Utilidades/formatoMoneda";
import { useContext, useEffect, useState } from "react";
import { usuarioContext } from "../../App";
import { theme } from "../../Tema";
import { guardarDoc } from "../../Servicios/BD/guardarDoc";
import { actualizarDoc } from "../../Servicios/BD/actualizarDoc";
import { useLoaders } from "../../Modulo_Loaders/Hooks/useLoaders";
import logo from '../../Recursos/logo.svg'
import Saldos_Cuenta from "./SubComponentes/Saldos_Cuenta";


const Detalle_Pago = ({ valorPlan }) => {
    const cData = useContext(usuarioContext)
    const { abrirCargador, cerrarCargador, Cargador } = useLoaders({ logo: logo })
    const [dineroDisponible, setDineroDisponible] = useState(0)


    let total = valorPlan + valorPlan * 0.05 + 1


    const comprarAccion = () => {
        let usuario = cData.usuario

        let idTransaccion = new Date().getTime() + 'TRA'
        let objCompraAccion = {
            nombre: usuario.nombre,
            idUsuario: usuario.id,
            correo: usuario.correo,
            fecha: new Date().getTime(),
            valor: valorPlan,
            estado: 'Por Ingresar',
            idTransaccion: idTransaccion
        }


        abrirCargador('Comprando accion')
        guardarDoc('compraAcciones', objCompraAccion).then((dox) => {
            if (dox.res) {
                actualizarUsuario(usuario, dox.data, idTransaccion)
            }
        })

    }

    const actualizarUsuario = (usuario, id, idTransaccion) => {

        // let saldoAcutal = 0;
        let saldoAct = 0
        let bonificacionesActual = 0
        let rendieminetosActual = 0

        if (usuario.saldo) {
            // saldoAcutal = usuario.saldo
            saldoAct = usuario.saldo
        }

        if (usuario.bonificaciones) {
            bonificacionesActual = usuario.bonificaciones
        }

        if (usuario.rendimientos) {
            rendieminetosActual = usuario.rendimientos
        }

        //   console.log('saldo', saldoAcutal)
        //   console.log('rendimientos', rendieminetosActual)
        //  console.log('bonificaciones', bonificacionesActual)
        //  console.log('total', total)

        let accionesActuales = 0
        if (usuario.acciones) {
            accionesActuales = parseFloat(cData.usuario.acciones)
        }

        // let diferencia = rendieminetosActual - total
        // if (diferencia < 0) {
        //     rendieminetosActual = 0
        // } else {
        //     rendieminetosActual = rendieminetosActual + diferencia
        // }
        //   console.log('rendimientos 1', rendieminetosActual)
        //   console.log('diferencia 1', diferencia)

        // diferencia = bonificacionesActual + diferencia
        // if (diferencia < 0) {
        //     bonificacionesActual = 0
        // } else {
        //     bonificacionesActual = bonificacionesActual + diferencia
        // }
        //   console.log('bonificacion 1', bonificacionesActual)
        //   console.log('diferencia 2', diferencia)

        // diferencia = saldoAcutal + diferencia
        // if (diferencia < 0) {
        //     saldoAcutal = 0
        // } else {
        //     saldoAcutal = diferencia
        // }
        //  console.log('saldoAcutal 1', saldoAcutal)
        //   console.log('diferencia 3', diferencia)

        let datos = {
            // saldo: saldoAcutal,
            saldo: saldoAct - total,
            // acciones: accionesActuales + valorPlan,
            acciones: accionesActuales,
            rendimientos: rendieminetosActual,
            bonificaciones: bonificacionesActual
        }

        actualizarDoc('usuarios', usuario.id, datos).then((dox) => {
            if (dox.res) {
                crearTransaccion(usuario, id, idTransaccion)
            }
        })

    }

    const crearTransaccion = (usuario, id, idTransaccion) => {

        let datosTrans = {
            id: idTransaccion,
            idUsuario: usuario.id,
            idDeposito: id,
            valor: valorPlan,
            dirOrigen: 'saldo',
            dirDestino: 'acciones',
            codAprobacion: new Date().getTime(),
            fecha: new Date().getTime(),
            estado: 'Por Ingresar',
            tipo: 'Compra Accion',
            token: 'saldo',
            red: 'FOXPLOR',
            nombre: usuario.nombre
        }


        guardarDoc('transacciones', datosTrans).then((dox) => {
            if (dox.res) {
                cerrarCargador()
                alert('Compra de Accion realizada con exito')
            }
        })
    }

    const verficarDinero = () => {

        if (valorPlan === 0) {
            return true
        }

        if (dineroDisponible > total) {
            return false
        }


        if (!cData.usuario.saldo) {
            return true
        }


        if (cData.usuario.saldo < total) {
            return true
        }

    }


    useEffect(() => {
        let disponible = 0

        if (cData.usuario.saldo) {
            disponible += parseInt(cData.usuario.saldo)
        }

        if (cData.usuario.rendimientos) {
            disponible += parseInt(cData.usuario.rendimientos)
        }

        if (cData.usuario.bonificaciones) {
            disponible += parseInt(cData.usuario.bonificaciones)
        }

        setDineroDisponible(disponible)


    }, [cData]);
    return (
        <Grid2
            container
            size={12}
            sx={{
                p: 3,
                background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)',
                border: 1,
                borderColor: '#ffffff40',
                borderRadius: 3,
                pb: 4
            }}
        >

            <Cargador />


            <Grid2 container size={12} sx={{ marginTop: 0 }}>
                <Saldos_Cuenta dineroDisponible={dineroDisponible} usuario={cData.usuario} total={total} />
            </Grid2>

            <Grid2 container size={12} sx={{ marginBottom: 2, marginTop: 4 }}>
                <Typography sx={{ color: '#fff', fontSize: 24, fontWeight: 600 }}>Finalizar Compra</Typography>
            </Grid2>


            <Grid2 container size={8} sx={{ justifyContent: 'flex-start' }}>
                <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>Compra Acción</Typography>
            </Grid2>

            <Grid2 container size={4} sx={{ justifyContent: 'flex-end' }}>
                <Typography sx={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 400
                }}>{formatoMoneda({ number: valorPlan })}</Typography>
            </Grid2>

            <Grid2 container size={8} sx={{ justifyContent: 'flex-start' }}>
                <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>Impuesto 5%</Typography>
            </Grid2>

            <Grid2 container size={4} sx={{ justifyContent: 'flex-end' }}>
                <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>{formatoMoneda({
                    number: valorPlan * 0.05,
                    decimales: 2
                })}</Typography>
            </Grid2>

            <Grid2 container size={10} sx={{ justifyContent: 'flex-start' }}>
                <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>Fee de transacción</Typography>
            </Grid2>

            <Grid2 container size={2} sx={{ justifyContent: 'flex-end' }}>
                <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 400 }}>$1</Typography>
            </Grid2>

            {verficarDinero() && valorPlan > 0 &&
                <Grid2 container size={12} sx={{ marginTop: 0 }}>
                    <Typography sx={{ color: theme.palette.primary.main, fontSize: 14, fontWeight: 400 }}>**No hay
                        suficiente
                        dinero en tu cuenta</Typography>
                </Grid2>
            }


            <Grid2 container size={12} sx={{ justifyContent: 'center', marginTop: 4 }}>
                <Button
                    onClick={() => comprarAccion()}
                    disabled={verficarDinero()}>{`PAGAR ${formatoMoneda({
                        number: total,
                        decimales: 2
                    })} USD`}</Button>
            </Grid2>


        </Grid2>
    )

}
export default Detalle_Pago