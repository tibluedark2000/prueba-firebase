/**************************************************
 * Nombre:       Balance_Acciones
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Button, Grid2 } from "@mui/material";
import Tarjeta_Monedero from "../Tarjetas/Tarjeta_Monedero";
import { ArrowDropDown, ArrowDropUpOutlined } from "@mui/icons-material";
import { useResponsive } from "../../Modulo_responsive/Hooks/useResponsive";
import { formatoMoneda } from "../../Utilidades/formatoMoneda";


const Deposito_Dinero = ({ open, setOpen, usuario }) => {
    const { sCell } = useResponsive()

    return (
        <Grid2 container size={12}
            sx={{
                borderRadius: 3,
                px: sCell ? 0 : 3,
                alignItems: 'center',
                justifyContent: 'flex-end'
            }}
        >


            <Grid2 container size={6} sx={{ pr: 4 }}>
                <Tarjeta_Monedero titulo={'Saldo en Cuenta'}
                    valor={formatoMoneda({ number: usuario.saldo ? usuario.saldo : 0, decimales: 2 })} />
            </Grid2>

            <Grid2 container size={6} sx={{ justifyContent: 'flex-end' }}>
                <Button
                    startIcon={open ? <ArrowDropUpOutlined /> : <ArrowDropDown />}
                    onClick={() => setOpen(!open)}
                >Depositar</Button>
            </Grid2>


        </Grid2>
    )

}
export default Deposito_Dinero