/**************************************************
 * Nombre:       Seccion_Home
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2} from "@mui/material";
import Portada_Login from "./Componentes/Portada_Login";
import Footer from "./Footer";
import BarraPc from "./Componentes/BarraPc";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


const Login = () => {

    return (
        <Grid2
            container
            size={12}
            sx={{backgroundColor: '#000'}}
        >

            <Router>
                <Grid2 container size={12} sx={{zIndex: 2}}>
                    <BarraPc/>
                </Grid2>

                <Grid2 container size={12} sx={{zIndex: 1}}>
                    <Routes>

                        <Route path={"/"} element={<Portada_Login/>}/>
                        <Route path={"/:id"} element={<Portada_Login/>}/>
                        <Route path={"*"} element={<Portada_Login/>}/>

                    </Routes>
                </Grid2>

                <Grid2 container size={12} sx={{zIndex: 1}}>
                    <Footer/>
                </Grid2>
            </Router>

        </Grid2>
    )

}
export default Login