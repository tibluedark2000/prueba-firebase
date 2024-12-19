/**************************************************
 * Nombre:       Tarjeta_Transaccion
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Button, Grid2, Typography } from "@mui/material";
import { theme } from "../../Tema";
import { formatoMoneda } from "../../Utilidades/formatoMoneda";
import { irArriba } from "../../Utilidades/irArriba";
import { useResponsive } from "../../Modulo_responsive/Hooks/useResponsive";

const Tarjeta_Plan = ({ item, click, valor }) => {
    const { sCell } = useResponsive()
    // console.log("Item: ", item);
    // console.log("Click: ", click);
    // console.log("Valor: ", valor);

    return (
        <Grid2 container size={12}
            sx={{ borderBottom: 1, borderColor: '#ffffff40', px: 2, py: 1, alignItems: 'center' }}
        >

            {!sCell &&
                <Grid2 container size={{ xs: 3, sm: 2, md: 2 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: sCell ? 16 : 20 }}>{formatoMoneda({
                        number: item,
                        decimales: 0
                    })}</Typography>
                </Grid2>
            }

            <Grid2 container size={{ xs: 3, sm: 2, md: 2 }}>
                <Typography sx={{ color: '#fff', fontWeight: 400, fontSize: sCell ? 14 : 16 }}>{formatoMoneda({
                    number: item * 0.01,
                    decimales: 2
                })}</Typography>
            </Grid2>

            <Grid2 container size={{ xs: 3, sm: 2, md: 2 }}>
                <Typography sx={{ color: '#fff', fontWeight: 400, fontSize: sCell ? 14 : 16 }}>{formatoMoneda({
                    number: item * 0.07,
                    decimales: 2
                })}</Typography>
            </Grid2>

            <Grid2 container size={{ xs: 3, sm: 2, md: 2 }}>
                <Typography sx={{ color: '#fff', fontWeight: 400, fontSize: sCell ? 14 : 16 }}>{formatoMoneda({
                    number: item * 0.29,
                    decimales: 2
                })}</Typography>
            </Grid2>

            <Grid2 container size={{ xs: 3, sm: 2, md: 2 }} sx={{ justifyContent: sCell ? 'center' : 'flex-start' }}>
                <Typography sx={{ color: '#fff', fontWeight: 400, fontSize: sCell ? 14 : 16 }}>{formatoMoneda({
                    number: item * 2,
                    decimales: 0
                })}</Typography>
            </Grid2>

            {sCell &&
                <Grid2 container size={{ xs: 6, sm: 2, md: 2 }} sx={{ marginTop: 1 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: sCell ? 16 : 20 }}>
                        {`Valor:  ${formatoMoneda({ number: item, decimales: 0 })}`}</Typography>
                </Grid2>
            }

            <Grid2 container size={{ xs: 6, sm: 2, md: 2 }} sx={{ justifyContent: 'flex-end', marginTop: sCell ? 1 : 0 }}>
                <Button
                    onClick={() => {

                        click(item)
                        setTimeout(() => {
                            irArriba()
                        }, 700)
                    }}
                    sx={{
                        backgroundColor: valor === item ? theme.palette.primary.main : '#FFFFFF10',
                        border: 1,
                        borderColor: '#fff', pt: 0.1, pb: 0.2
                    }}>
                    Obtener
                </Button>
            </Grid2>

        </Grid2>
    )

}
export default Tarjeta_Plan