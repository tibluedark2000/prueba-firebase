/**************************************************
 * Nombre:       Footer
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {ButtonBase, Grid2, Typography} from "@mui/material";

import {AccountBox, Home, Login, Mail, Phone, Place} from "@mui/icons-material";
import logo from '../Recursos/logo.svg'
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {obtenerSeccion} from "../Utilidades/obtenerSeccion";
import {useResponsive} from "../Modulo_responsive/Hooks/useResponsive";
import Icono_Texto from "./Componentes/SubComponentes/Icono_Texto";
import {LINKPAGINA} from "../Constantes";
import {irArriba} from "../Utilidades/irArriba";

const Footer = () => {
    const {sCell, sTab} = useResponsive()
    const location = useLocation()
    const [isHome, setIsHome] = useState(false)



    return (
        <Grid2
            container
            size={12}
            sx={{
                justifyContent: 'center',
                background: isHome ? 'linear-gradient(105.65deg, rgba(0, 0, 0, 0.9) 18.43%, #000000 66.3%, #FF6100 114.17%)' :
                    'linear-gradient(0deg, rgba(0,0,0,1) 30%, rgba(0,0,0,0.6306897759103641) 52%, rgba(0,0,0,0.21052170868347342) 74%, rgba(0,0,0,0) 100%)',
                pt: 8,
            }}
        >

            <Grid2
                container
                size={12}
                sx={{maxWidth: '1400px', px: 3, justifyContent: 'center'}}
            >

                <Grid2
                    container
                    size={{xs: 12, sm: 11, md: 11}}
                    sx={{
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.1) 100%)',
                        borderRadius: 6,
                        p: 5,
                        alignItems: 'flex-start'
                    }}
                >

                    <Grid2 container size={{xs: 12, sm: 6, md: 4}} spacing={1} sx={{alignItems: 'flex-start'}}>
                        <Grid2 container size={12}>
                            <Typography sx={{color: '#fff', fontWeight: 600, fontSize: 24}}>Links Rápidos</Typography>
                        </Grid2>

                        <Grid2
                            container size={12} sx={{marginTop: 2}}>
                            <ButtonBase
                                href={LINKPAGINA}
                                sx={{width: '100%', textAlign: 'left'}} >
                                <Icono_Texto icono={<Home sx={{fill: '#fff'}}/>} texto={'Home'}/>
                            </ButtonBase>
                        </Grid2>

                        <Grid2
                            onClick={() => irArriba()}
                            container size={12} sx={{marginTop: 0}}>
                            <Icono_Texto icono={<Login sx={{fill: '#fff'}}/>} texto={'Ingresar'}/>
                        </Grid2>

                        <Grid2
                            onClick={() => irArriba()}
                            container size={12}>
                            <Icono_Texto icono={<AccountBox sx={{fill: '#fff'}}/>} texto={'Registrarse'}/>
                        </Grid2>


                    </Grid2>

                    <Grid2 container size={{xs: 12, sm: 6, md: 4}} spacing={1}
                           sx={{alignItems: 'flex-start', marginTop: sCell ? 4 : 0}}>
                        <Grid2 container size={12}>
                            <Typography sx={{color: '#fff', fontWeight: 600, fontSize: 24}}>Contactos</Typography>
                        </Grid2>

                        <Grid2 container size={12} sx={{marginTop: 2}}>
                            <Icono_Texto icono={<Phone sx={{fill: '#fff'}}/>}
                                         texto={'Atencion al Cliente: +57 321 3389 634'}/>
                        </Grid2>

                        <Grid2 container size={12}>
                            <Icono_Texto icono={<Mail sx={{fill: '#fff'}}/>} texto={'info@foxplor.app'}/>
                        </Grid2>


                    </Grid2>

                    <Grid2 container size={{xs: 12, sm: 12, md: 4}} sx={{justifyContent: 'center', marginTop: 7}}>
                        <img src={logo} width={sTab ? '50%' : '80%'}/>
                    </Grid2>


                </Grid2>

            </Grid2>

            <Grid2 container size={12} sx={{justifyContent: 'center', py: 4, px: 3}}>
                <Typography sx={{color: '#fff', textAlign: 'center'}}>FOXPLOR | Todos los derechos reservados | © 2024 - 2025</Typography>
            </Grid2>

        </Grid2>
    )

}
export default Footer