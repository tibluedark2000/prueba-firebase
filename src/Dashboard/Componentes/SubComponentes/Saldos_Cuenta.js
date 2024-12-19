/**************************************************
 * Nombre:       Saldos_Cuenta
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Grid2, Typography} from "@mui/material";
import {formatoMoneda} from "../../../Utilidades/formatoMoneda";
import {theme} from "../../../Tema";
import {useNavigate} from "react-router-dom";

const Saldos_Cuenta = ({dineroDisponible, usuario, total}) => {
    const navigate = useNavigate()

    return (
        <Grid2 container size={12}>
            <Grid2 container size={8} sx={{justifyContent: 'flex-start'}}>
                <Typography sx={{color: '#fff', fontSize: 16, fontWeight: 400}}>Saldo en Cuenta</Typography>
            </Grid2>

            <Grid2 container size={4} sx={{justifyContent: 'flex-end'}}>
                <Typography sx={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 400
                }}>{formatoMoneda({number: usuario.saldo, decimales: 2})}</Typography>
            </Grid2>

            <Grid2 container size={8} sx={{justifyContent: 'flex-start'}}>
                <Typography sx={{color: '#fff', fontSize: 16, fontWeight: 400}}>Rendimientos</Typography>
            </Grid2>

            <Grid2 container size={4} sx={{justifyContent: 'flex-end'}}>
                <Typography sx={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 400
                }}>{formatoMoneda({number: usuario?.rendimientos, decimales: 2})}</Typography>
            </Grid2>


            <Grid2 container size={8} sx={{justifyContent: 'flex-start'}}>
                <Typography sx={{color: '#fff', fontSize: 16, fontWeight: 400}}>Bonificaciones</Typography>
            </Grid2>

            <Grid2 container size={4} sx={{justifyContent: 'flex-end'}}>
                <Typography sx={{
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 400
                }}>{formatoMoneda({number: usuario?.bonificaciones, decimales: 2})}</Typography>
            </Grid2>

            <Grid2 container size={12} sx={{borderTop: 1, borderColor: '#ffffff50', marginTop: 1, mb: 1}}>

            </Grid2>

            <Grid2 container size={8} sx={{justifyContent: 'flex-start'}}>
                <Typography sx={{
                    color: total > dineroDisponible ? theme.palette.primary.main : theme.palette.success.main,
                    fontSize: 16,
                    fontWeight: 400
                }}>Disponible para compra</Typography>
            </Grid2>

            <Grid2 container size={4} sx={{justifyContent: 'flex-end'}}>
                <Typography sx={{
                    color: total > dineroDisponible ? theme.palette.primary.main : theme.palette.success.main,
                    fontSize: 16,
                    fontWeight: 400
                }}>{formatoMoneda({number: dineroDisponible, decimales: 2})}</Typography>
            </Grid2>

            {total > dineroDisponible &&

                <>

                    <Grid2 container size={{xs: 12, sm: 12, md: 12}} sx={{justifyContent: 'center', marginTop: 2}}>
                        <Button
                            onClick={() => navigate('/Dashboard/' + (total - dineroDisponible + 5))}
                        >{`Depositar ${formatoMoneda({number: total - dineroDisponible + 5})}`}</Button>
                    </Grid2>

                    <Grid2 container size={12} sx={{marginTop: 1}}>
                        <Typography sx={{color: '#fff', fontSize: 12, fontWeight: 300}}>**Recuerda
                            dejar
                            dinero suficiente para el pago de impuestos</Typography>
                    </Grid2>

                </>
            }


        </Grid2>
    )

}
export default Saldos_Cuenta