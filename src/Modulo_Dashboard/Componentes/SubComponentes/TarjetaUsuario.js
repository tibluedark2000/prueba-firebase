/**************************************************
 * Nombre:       TarjetaUsuario
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, IconButton, Typography} from "@mui/material";
import {PowerSettingsNew} from "@mui/icons-material";
import {useAnimate} from "framer-motion";
import {useContext, useEffect, useState} from "react";
import logo from '../../../Recursos/logo_redondo.svg'
import {usuarioContext} from "../../../App";
import {useMediaQuery} from "@mui/system";
import {theme} from "../../../Tema";


const TarjetaUsuario = ({salir}) => {
    const masSM = useMediaQuery(theme.breakpoints.up("md"))
    const [scope, animate] = useAnimate()
    const [opaco, setOpaco] = useState(1)
    const cData = useContext(usuarioContext)

    useEffect(() => {
        if (scope.current && masSM) {
            setOpaco(0)
            animate(scope.current, {x: -200, transitionDuration: 1500})
            setTimeout(() => {
                setOpaco(1)
                animate(scope.current, {x: 1, transitionDuration: 1500})
            }, 500)
        }
    }, []);
    return (
        <Grid2
            ref={scope}
            container
            size={12}
            sx={{
                backgroundColor: '#ffffff20',
                borderRadius: 2,
                border: 1,
                borderColor: '#ffffff50',
                backdropFilter: 'blur(10px)',
                position: 'absolute',
                bottom: 18,
                width: '82%',
                opacity: opaco
            }}
            padding={'16px'}
            alignItems={'center'}
        >


            <Grid2 size={3}>
                <img src={logo} width={30} height={'auto'}/>
            </Grid2>

            <Grid2 container size={7} sx={{pl: 1}}>
                <Grid2 size={12}>
                    <Typography sx={{
                        fontSize: 16, fontWeight: 600, color: '#fff', display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        textOverflow: "ellipsis",
                    }}>{cData?.usuario.nombre}</Typography>
                </Grid2>

                <Grid2 size={12} sx={{marginTop: -0.4}}>
                    <Typography sx={{fontSize: 12, fontWeight: 400, color: '#fff'}}>Usuario</Typography>
                </Grid2>
            </Grid2>

            <Grid2 container size={2} justifyContent={'center'}>
                <IconButton
                    onClick={() => salir()}
                >
                    <PowerSettingsNew color={'primary'} sx={{width: 20, height: 20}}/>
                </IconButton>

            </Grid2>

        </Grid2>
    )

}
export default TarjetaUsuario