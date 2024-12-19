/**************************************************
 * Nombre:       Barra
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {ButtonBase, Grid2, useMediaQuery} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useAnimate} from "framer-motion";
import IconoNotificaciones from "./SubComponentes/IconoNotificaciones";
import IconoHistorial from "./SubComponentes/IconoHistorial";
import {theme} from "../../Tema";

const Barra = ({setOpen, open, seccionesPerfil}) => {
    const masSM = useMediaQuery(theme.breakpoints.up('md'))
    const [navegando, setNavegando] = useState(false)
    const [scope, animate] = useAnimate()
    const [opaco, setOpaco] = useState(1)
    const [openPerfil, setOpenPerfil] = useState(false)
    const [openPerfilNotificacion, setOpenPerfilNotificaciones] = useState(false)


    useEffect(() => {


        window.addEventListener('scroll', (e) => {
            if (window.scrollY > 50 && !navegando) {
                setNavegando(true)
            } else if (window.scrollY < 50) {
                setNavegando(false)
            }

        });


        if (scope.current && masSM) {
            setOpaco(0)
            animate(scope.current, {x: -200, transitionDuration: 1500})
            setTimeout(() => {
                setOpaco(1)
                if (scope.current) {
                    animate(scope.current, {x: 1, transitionDuration: 1500})
                }

            }, 500)
        }


    }, [open]);
    return (
        <Grid2
            container
            size={12}
            alignItems={'center'}
            sx={{
                px: 4,
                py: 2,
                boxShadow: navegando ? 3 : 0,
                position: 'fixed',
                top: '0%',
                backgroundColor: '#131313',
                pr: open && masSM ? 36 : masSM ? 13 : 4,
            }}
        >

            <Grid2 size={{xs: 2, sm: 2, md: 2}}>
                <ButtonBase
                    onClick={() => setOpen((e) => !e)}
                >
                    <Menu sx={{fill: '#fff'}}/>
                </ButtonBase>

            </Grid2>

            <Grid2 size={{xs: 2, sm: 6, md: 8}}>

            </Grid2>

            <Grid2
                ref={scope}
                container size={{xs: 8, sm: 4, md: 2}} justifyContent={'flex-end'} justifyItems={'center'}
                sx={{opacity: opaco, pr: openPerfil || openPerfilNotificacion ? 1.7 : 0}}
                spacing={masSM ? 6 : 0}
            >

                {/*} <Grid2 container size={2} justifyContent={'flex-end'}>

                </Grid2>

                <Grid2 container size={2} justifyContent={'flex-end'}>
                     <IconButton>
                        <WbSunnyOutlined color={'info'} sx={{width: 20, height: 20}}/>
                    </IconButton>

                </Grid2>*/}

                <Grid2 container size={2} justifyContent={'flex-end'}>
                    {/*} <IconoHistorial/>*/}
                </Grid2>

                <Grid2 container size={2} justifyContent={'flex-end'}>
                    <IconoNotificaciones color={'info'} sx={{width: 20, height: 20}}
                                         setOpenPerfilNotificaciones={setOpenPerfilNotificaciones}
                                         openPerfilNotificacion={openPerfilNotificacion}/>
                </Grid2>

                {/*} <Grid2 container size={2} justifyContent={'flex-end'}>
                    <IconoAvatarPerfil openPerfil={openPerfil} setOpenPerfil={setOpenPerfil}
                                       seccionesPerfil={seccionesPerfil}/>
                </Grid2>*/}


            </Grid2>


        </Grid2>
    )

}
export default Barra