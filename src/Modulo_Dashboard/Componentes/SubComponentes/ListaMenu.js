/**************************************************
 * Nombre:       ListaMenu
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {ButtonBase, Grid2, Typography} from "@mui/material";
import {theme} from "../../../Tema";
import {useAnimate} from "framer-motion";
import {useEffect, useState} from "react";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useMediaQuery} from "@mui/system";


const ListaMenu = ({open, seccionesProcesadas, setOpen}) => {
    const sCell = useMediaQuery((theme) => theme.breakpoints.only('xs'))
    const masSM = useMediaQuery(theme.breakpoints.up("md"))
    const navigate = useNavigate()
    const location = useLocation()
    const [scope, animate] = useAnimate()
    const [opaco, setOpaco] = useState(1)

    useEffect(() => {

        if (scope.current && masSM){
            setOpaco(0)
            animate(scope.current, {x: -200, transitionDuration: 1500})
            setTimeout(() => {
                setOpaco(1)
                if (scope.current){
                    animate(scope.current, {x: 1, transitionDuration: 1500})
                }

            }, 500)
        }

    }, [open]);
    return (
        <ScrollBar dir={'rigth'} options={{suppressScrollX: true, maxScrollbarLength: 150}}
                   style={{width: open ? '112%' : '170%', marginRight: -24, maxHeight: open ? '74vh' : '84vh'}}>
            <Grid2
                ref={scope}
                container
                size={12}
                sx={{opacity: opaco, pr: 3}}
            >

                {seccionesProcesadas.map((it, index) => {
                    return (
                        <Grid2 container spacing={0} size={12} sx={{marginTop: open ? 3 : 3,}}>
                            <Grid2 container size={12} justifyContent={open ? 'flex-start' : 'center'}>
                                <Typography sx={{fontSize: open ? 12 : 16, fontWeight: 600, marginBottom: 1, color: '#fff'}}>
                                    {open ? it.categoria.toUpperCase() : '...'}
                                </Typography>
                            </Grid2>

                            {it.secciones.map((sec, index) => {
                                return (

                                    <ButtonBase
                                        onClick={() => {
                                            if (sCell) {
                                                setTimeout(() => {
                                                    setOpen(false)
                                                }, 600)
                                            }
                                            navigate(sec.camino)
                                        }
                                        }
                                        sx={{
                                            width: '100%',
                                            py: 1.5,
                                            borderRadius: 2,
                                            backgroundColor: location.pathname === sec.camino ? theme.palette.primary.main : '',
                                            transition: "all .2s ease-in-out",
                                            '&:hover': {
                                                backgroundColor: location.pathname === sec.camino ? theme.palette.primary.main : theme.palette.primary.main + 40,
                                                color: theme.palette.primary.main
                                            }
                                        }}>
                                        <Grid2 container size={12}>
                                            <Grid2 container justifyContent={'center'} size={open ? 3 : 12}>
                                                <sec.icono sx={{
                                                    width: 22,
                                                    height: 22,
                                                    fill: location.pathname === sec.camino ? '#fff' : theme.palette.info.main
                                                }}/>
                                            </Grid2>
                                            {open &&
                                                <Grid2 container size={9}>
                                                    <Typography sx={{
                                                        fontSize: 16, fontWeight: 500,
                                                        color: location.pathname === sec.camino ? '#fff' : theme.palette.info.main
                                                    }}>
                                                        {sec.nombre}
                                                    </Typography>
                                                </Grid2>
                                            }
                                        </Grid2>
                                    </ButtonBase>

                                )
                            })}

                        </Grid2>
                    )
                })}


            </Grid2>
        </ScrollBar>
    )

}
export default ListaMenu

