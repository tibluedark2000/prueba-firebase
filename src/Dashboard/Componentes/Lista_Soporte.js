/**************************************************
 * Nombre:       Lista_Transacciones
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Grid2} from "@mui/material";
import Tarjeta_Transaccion from "../Tarjetas/Tarjeta_Transaccion";
import Tarjeta_Soporte from "../Tarjetas/Tarjeta_Soporte";

const Lista_Soporte = () => {

    return (
        <Grid2 container size={12}>
            {items.map((item, index) => {
                return (
                    <Tarjeta_Soporte/>
                )
            })}

            <Grid2 container size={12} sx={{justifyContent: 'flex-end', marginTop:2}} >
                <Button variant={"outlined"} color={'secondary'}>Cargas mas movimientos</Button>
            </Grid2>


        </Grid2>
    )

}
export default Lista_Soporte

const items = [1, 2, 3, 4, 5, 6]