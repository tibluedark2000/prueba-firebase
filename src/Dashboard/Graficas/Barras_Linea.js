/**************************************************
 * Nombre:       Barras_Linea
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid} from "@mui/material";
import Chart from "react-apexcharts";
import {useRef} from "react";
import {useObtenerAncho} from "../../Modulo_Grafias/Hooks/useObtenerAncho";
import {theme} from "../../Tema";

const Barras_Linea = ({color=theme.palette.success.main, anchoLinea=2.5, datos=[], nombre=''}) => {
    const refe = useRef()
    const {ancho} = useObtenerAncho({contenedor: refe})

    const data =
        [
            {
                name: nombre,
                data: datos.length > 0 ? datos : [0]
            }
        ]

    const opciones =
        {
            chart: {
                type: 'line',
                toolbar: {
                    show: false
                },
                background: '#ffffff00',
                sparkline: {
                    enabled: true
                },
                offsetY: 0,
                parentHeightOffset: 0,
            },
            stroke: {
               curve: 'smooth',
                width: anchoLinea
            },
            tooltip: {
                x: {
                    show: false
                }
            },
            colors: [color],

        }


    return (
        <Grid
            ref={refe}
            item
            container

        >
            <Chart
                options={opciones}
                series={data}
                type="line"
                width={ancho}
            />
        </Grid>
    )

}
export default Barras_Linea