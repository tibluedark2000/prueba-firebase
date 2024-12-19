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
import IngresoImagenCrop from "../../Modulo_formularios/Componentes/IngresoImagenCrop";
import IngresoImagenCropCustom from "../../Modulo_formularios/Componentes/IngresoImagenCropCustom";


const Formulario_Captura_Pantalla = ({...props}) => {


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

                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    <IngresoImagenCropCustom   dato={'img'}  {...props}
                    />
                </Grid>



            </Grid>
        </form>

    )

}
export default Formulario_Captura_Pantalla