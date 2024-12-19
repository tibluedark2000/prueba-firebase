/**************************************************
 * Nombre:       LogoMenu
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, useMediaQuery} from "@mui/material";
import logo from "../../../Recursos/logo_oscuro.svg";
import logoRedondo from "../../../Recursos/logo_redondo.svg";
import {useAnimate} from "framer-motion"
import {useEffect, useState} from "react";
import {theme} from "../../../Tema";

const LogoMenu = ({open}) => {
    const masSM = useMediaQuery(theme.breakpoints.up("md"))
    const [scope, animate] = useAnimate()

    useEffect(() => {
        if (scope.current && masSM )
        animate(scope.current, {x: -200, transitionDuration: 1500})
        setTimeout(() => {
            if (scope.current){
                animate(scope.current, {x: 1, transitionDuration: 1500})
            }

        }, 500)
    }, [open]);
    return (
        <Grid2 ref={scope} container justifyContent={open ? 'flex-start' : 'center'} size={12} sx={{marginBottom: open ? 2 : 0}}  >
            <img src={open ? logo : logoRedondo} width={open ? '100%' : '100%'} height={'auto'} style={{ maxHeight: 36}}
            />
        </Grid2>
    )

}
export default LogoMenu