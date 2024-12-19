import React, {createContext, useEffect} from 'react';
import './App.css';
import '@fontsource/space-grotesk/300.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import {Grid2} from "@mui/material";
import Login from "./Login/Login";
import {useEscucharAuth} from "./Servicios/Auth/useEscucharAuth";
import {useEscucharUsuarioToCorreo} from "./Servicios/BD/useEscucharUsuarioToCorreo";
import {iniciarAnaliticas} from "./Servicios/Analiticas/iniciarAnaliticas";
import Dashboard from "./Dashboard/Dashboard";
import {theme} from "./TemaDash";
import {ThemeProvider} from "@mui/system";

export const usuarioContext = createContext();

function App() {
    const {email} = useEscucharAuth()
    const {usuario} = useEscucharUsuarioToCorreo({correo: email})


    const valoresProvider = {
        usuario,
    }

    const {Provider} = usuarioContext;


    useEffect(() => {

        iniciarAnaliticas()

        if (window.swUpdateReady) {
            window.swUpdateReady = false;
            window.stop();
            window.location.reload();
        }


    }, [])

    return (
        <Grid2
            container
            size={12}
            sx={{backgroundColor: '#131313', overflowX: 'hidden'}}
        >
            <Provider value={valoresProvider}>
                {usuario ?
                    <ThemeProvider theme={theme}>
                    <Dashboard/>
                    </ThemeProvider>
                    :
                    <Login/>
                }

            </Provider>

        </Grid2>
    );
}

export default App;
