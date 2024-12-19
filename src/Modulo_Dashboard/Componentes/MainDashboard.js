/**************************************************
 * Nombre:       MainDashboard
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, useMediaQuery} from "@mui/material";
import Barra from "./Barra";
import {Route, Routes} from "react-router-dom";
import {theme} from "../../Tema";

const MainDashboard = ({open, setOpen, masSM, secciones = [], seccionesID = [], seccionesPerfil}) => {
    const sCell = useMediaQuery(theme.breakpoints.only('xs'))
    const getMargen = () => {
        if (masSM) {
            return open ? 33 : 10
        } else {
            return 0
        }
    }

    return (
        <Grid2
            container
            size={12}
            sx={{
                pl: getMargen(),
                transition: "all .4s ease-in-out",
            }}
        >

            <Grid2 container size={12} sx={{zIndex: 2}}>
                <Barra setOpen={setOpen} open={open} seccionesPerfil={seccionesPerfil}/>
            </Grid2>

            <Grid2 container size={12} sx={{pl: sCell ? 0 : 4, pr: sCell ? 0 : 3, marginTop: 10, zIndex: 1}}>

                <Routes>

                    {secciones.map((it, index) => {

                        return (
                            <Route key={`cam-${index}`} path={it.camino}
                                   element={it.Componente}/>
                        )

                    })}


                    {seccionesID.map((it, index) => {
                        return (
                            <Route key={`camid-${index}`} path={it.camino} element={it.Componente}/>
                        )
                    })}

                    {seccionesPerfil.map((it, index) => {
                        return (
                            <Route key={`camidP-${index}`} path={it.camino} element={it.Componente}/>
                        )
                    })}


                </Routes>

            </Grid2>

        </Grid2>
    )

}
export default MainDashboard