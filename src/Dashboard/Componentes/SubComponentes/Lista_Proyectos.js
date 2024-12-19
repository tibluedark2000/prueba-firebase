/**************************************************
 * Nombre:       Lista_Proyectos
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2} from "@mui/material";
import Tarjeta_Proyectos from "../../Tarjetas/Tarjeta_Proyectos";

const Lista_Proyectos = () => {

    return (
        <Grid2
            container
            size={12}
        >


            {proyectos.map((item, index) => {
                return (
                    <Grid2 container size={12}>
                        <Tarjeta_Proyectos item={item}/>
                    </Grid2>
                )
            })}


        </Grid2>
    )

}
export default Lista_Proyectos

const proyectos = [
    {
        nombre: 'Smart Agricultura',
        valor: 4506,
        datos: [120,456,654,520,784,561]
    },
    {
        nombre: 'Smart Building',
        valor: 7646,
        datos: [550,456,712,864,642,900]
    },
    {
        nombre: 'Smart Idiomas',
        valor: 5421,
        datos: [320,450,942,756,804,960]
    },
    {
        nombre: 'Smart Places',
        valor: 2545,
        datos: [122,320,540,464,720,912]
    },
]