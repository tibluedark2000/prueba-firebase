/**************************************************
 * Nombre:       Balance_Acciones
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Button, Grid2, Typography } from "@mui/material";
import Barras_Linea from "../Graficas/Barras_Linea";
import { theme } from "../../Tema";
import Tarjeta_Monedero from "../Tarjetas/Tarjeta_Monedero";
import { useEffect, useState } from "react";
import { obtenerColeccionQuery } from "../../Servicios/BD/obtenerColeccionQuery";
import { collection, query, where } from "firebase/firestore";
import { fire } from "../../fire";
import { ad_compra_acciones_tabla } from "../Adaptadores/ad_compra_acciones_tabla";
import { formatoMoneda } from "../../Utilidades/formatoMoneda";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../../Modulo_responsive/Hooks/useResponsive";
import { contarPropiedadSumaWheres } from "../../Servicios/BD/Contadores/contarPropiedadSumaWheres";

const Balance_Acciones = ({ usuario }) => {
    const { sCell, masSM } = useResponsive()
    const navigate = useNavigate()
    const [acciones, setAcciones] = useState([])
    const [accionesActivas, setAccionesActivas] = useState(0)

    useEffect(() => {

        if (usuario && usuario.id) {
            let q = query(collection(fire, 'compraAcciones'),
                where('idUsuario', '==', usuario.id),
                where('estado', '==', 'Activa')
            )
            obtenerColeccionQuery(q).then((dox) => {
                if (dox.res) {
                    setAcciones(dox.data)
                }
            })

            contarPropiedadSumaWheres({
                coleccion: 'compraAcciones', propiedad: 'valor',
                wheres: [where('idUsuario', '==', usuario.id), where('estado', '==', 'Activa')]
            }).then((dox) => {
                if (dox.res) {
                    setAccionesActivas(dox.data)
                }
            })
        }

    }, [usuario]);
    return (
        <Grid2 container size={12}
            sx={{
                border: 1,
                borderColor: '#ffffff50',
                borderRadius: 3,
                p: 3,
                alignItems: 'center',
                justifyContent: 'flex-end',
                background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)',
            }}
        >

            <Grid2 container size={12} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 2 }}>
                <Grid2 container size={8}>
                    <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 500 }}>Balance de Acciones</Typography>
                </Grid2>

                <Grid2 container size={4} sx={{ justifyContent: 'flex-end' }}>
                    <Grid2 container size={10} sx={{ justifyContent: 'flex-end' }}>
                        <Typography sx={{
                            color: '#fff',
                            fontSize: !masSM ? 32 : 42,
                            lineHeight: 1
                        }}>{formatoMoneda({ number: accionesActivas, decimales: 0 })}</Typography>
                    </Grid2>
                    {/* <Grid2 container size={2} sx={{ justifyContent: 'flex-end' }}>
                        <Typography sx={{ color: theme.palette.success.main }}>12%</Typography>
                    </Grid2> */}
                </Grid2>

            </Grid2>

            <Grid2 container size={{ xs: 12, sm: 6, md: 6 }} sx={{ pr: 4 }}>
                <Barras_Linea color={theme.palette.primary.main} anchoLinea={5}
                    datos={ad_compra_acciones_tabla(acciones)} nombre={'Acciones'} />
            </Grid2>

            <Grid2 container size={{ xs: 12, sm: 6, md: 6 }}
                sx={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: sCell ? 4 : 0 }}
                spacing={1}

            >
                <Grid2 container size={6}>
                    <Tarjeta_Monedero titulo={'Acciones Activas'}
                        valor={formatoMoneda({ number: accionesActivas, decimales: 0 })} />
                </Grid2>
                <Grid2 container size={6}>
                    <Tarjeta_Monedero titulo={'Ultimo Retiro'} valor={''} difiere={true} />
                </Grid2>

                <Grid2 container size={6}>
                    <Tarjeta_Monedero titulo={'Rendimientos'}
                        valor={formatoMoneda({ number: usuario.rendimientos, decimales: 2 })} />
                </Grid2>
                <Grid2 container size={6}>
                    <Tarjeta_Monedero titulo={!masSM ? 'Bonoficacion' : 'Bonificacion de accion'}
                        valor={formatoMoneda({ number: usuario.bonificaciones, decimales: 2 })} />
                </Grid2>

            </Grid2>

            <Grid2 container size={12} direction={'row-reverse'} sx={{ marginTop: !masSM ? 3 : 0 }}>

                <Grid2 container size={{ xs: 12, sm: 4, md: 4 }} sx={{ justifyContent: 'flex-end' }}>
                    <Button
                        fullWidth={sCell}
                        onClick={() => navigate('/Planes')}
                    >COMPRAR MAS</Button>
                </Grid2>

                <Grid2 container size={{ xs: 12, sm: 5, md: 5 }}
                    sx={{ justifyContent: 'flex-end', marginTop: sCell ? 2 : 0 }}>
                    <Button
                        onClick={() => alert('No tienes dinero suficiente para hacer un retiro')}
                        color={'secondary'} variant={'outlined'}>
                        <Grid2 container size={12} sx={{ justifyContent: 'center' }}>
                            <Grid2 container size={12} sx={{ justifyContent: 'center' }}>
                                <Typography sx={{ textAlign: 'center' }}>No Habilitado {/*<span style={{fontWeight: 600}}>15 Nov 2024</span>*/}</Typography>
                            </Grid2>
                            <Grid2 container size={12} sx={{ marginTop: -1, justifyContent: 'center' }}>
                                <Typography sx={{ color: '#fff', fontSize: 10, textAlign: 'center' }}>** Se habilita 15 y
                                    30
                                    de cada mes </Typography>
                            </Grid2>
                        </Grid2>
                    </Button>
                </Grid2>

            </Grid2>


        </Grid2>
    )

}
export default Balance_Acciones