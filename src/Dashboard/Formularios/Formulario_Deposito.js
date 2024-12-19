/**************************************************
 * Nombre:       Formulario_Productos
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid} from "@mui/material";

import {CurrencyBitcoin, LocalAtm} from "@mui/icons-material";
import IngresoDinero from "../../Modulo_formularios/Componentes/IngresoDinero";
import IngresoSelect from "../../Modulo_formularios/Componentes/IngresoSelect";
import {CRIPTOS} from "../../Modulo_BotonCripto/Constantes";


const Formulario_Deposito = ({...props}) => {


    return (
        <form noValidate style={{width: '100%'}}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                sx={{p: 1}}
            >

                <Grid item container lg={4} sm={4} xs={6} sx={{justifyContent: 'center'}}>
                    <IngresoDinero Icono={LocalAtm} nombre={'Monto en USD'} dato={'valor'}  {...props}
                                   requerido={'El Monto es requerido'}

                    />
                </Grid>

                <Grid item container lg={8} sm={8} xs={12} sx={{justifyContent: 'center', marginTop: 0.4}}>
                    <IngresoSelect Icono={CurrencyBitcoin} nombre={''} dato={'cripto'}
                                   opciones={CRIPTOS.map((it) => it.nombre)}
                                   {...props}
                    />
                </Grid>


            </Grid>
        </form>

    )

}
export default Formulario_Deposito