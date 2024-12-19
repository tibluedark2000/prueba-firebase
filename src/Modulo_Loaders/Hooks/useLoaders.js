import {Backdrop, CircularProgress, Fade, Grid, Typography} from "@mui/material";
import {useState} from "react";
import './estilos.css'

export const useLoaders = ({logo}) => {
    const [open, setOpen] = useState(false)
    const [proceso, setProceso] = useState('')


    const abrir = (e) => {
        setProceso(e)
        setOpen(true)
    }

    const cerrar = () => {
        setOpen(false)
    }
    const Cargador = () => {

        return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >


                    <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                        <img src={logo} width={150} height={'auto'} className={'cargando'}/>
                    </Grid>

                    <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start', marginTop: 2}}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                        >


                            <Grid item container lg={4} sm={6} xs={8} sx={{justifyContent: 'center', px: 3}}>
                                <Typography sx={{
                                    color: '#fff',
                                    marginTop: -0.5,
                                    pr: 2,
                                    textAlign: 'center'
                                }}>{proceso}</Typography>
                                <CircularProgress size={proceso ? 20 : 0}/>
                            </Grid>


                        </Grid>
                    </Grid>


                </Grid>

            </Backdrop>
        )
    }

    return {
        Cargador,
        abrirCargador: abrir,
        cerrarCargador: cerrar,

    }
}