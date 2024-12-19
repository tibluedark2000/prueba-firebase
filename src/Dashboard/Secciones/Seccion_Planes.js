/**************************************************
 * Nombre:       Seccion_Dashboard
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Grid2 } from "@mui/material";
import Planes_Accion from "../Componentes/Planes_Accion";
import Detalle_Pago from "../Componentes/Detalle_Pago";
import { useEffect, useState } from "react";
import { irArriba } from "../../Utilidades/irArriba";

const Seccion_Planes = () => {
    const [valorPlan, setValorPlan] = useState(0)

    useEffect(() => {
        irArriba()
    }, []);
    return (

        <Grid2 container size={12} sx={{ justifyContent: 'cebter' }}>


            <Grid2
                container
                size={12}
                spacing={4}
                direction={'row-reverse'}
                sx={{ alignItems: 'flex-start', maxWidth: '1400px', px: 3 }}
            >

                <Grid2 container size={{ sx: 12, sm: 12, md: 4 }}>
                    <Detalle_Pago valorPlan={valorPlan} />
                </Grid2>


                <Grid2 container size={{ sx: 12, sm: 12, md: 8 }}>
                    <Planes_Accion click={setValorPlan} valor={valorPlan} />
                </Grid2>

            </Grid2>

        </Grid2>
    )

}
export default Seccion_Planes