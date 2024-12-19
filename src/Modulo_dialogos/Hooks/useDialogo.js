import {Dialog, Grid, IconButton, Typography, useMediaQuery} from "@mui/material";
import {useMemo, useState} from "react";
import {Close} from "@mui/icons-material";
import {theme} from "../../Tema";


export const useDialogo = ({Componente, realizado, titulo = '', grande = true}) => {
    const sCell = useMediaQuery(theme.breakpoints.only('xs'))
    const [open, setOpen] = useState(false)
    const [datos, setDatos] = useState({})

    const abrir = (e) => {
        setDatos(e)
        setOpen(true)
    }

    const cerrar = (res) => {
        setOpen(false)
        if (res) {
            realizado()
        }

    }


    const Dialogo = () => useMemo(() => {

        return (
            <Dialog open={open} fullWidth maxWidth={'xs'} fullScreen={sCell} sx={{m: sCell ? 2 : 0}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{overflowX: 'hidden', pt: 1, border: 1, borderColor: '#ffffff80', borderRadius: 3}}
                >

                    <Grid item container lg={10} sm={10} xs={10} sx={{justifyContent: 'flex-start', px: 3}}>
                        <Typography sx={{fontWeight: 600, fontSize: 18}}>{titulo}</Typography>
                    </Grid>

                    <Grid item container lg={2} sm={2} xs={2} sx={{justifyContent: 'flex-end', pr: 1}}>
                        <IconButton onClick={() => cerrar()}>
                            <Close sx={{fill: '#fff'}} />
                        </IconButton>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{pt: 1, marginTop: 0, pr: 2, pl: grande ? 3 : 2, pb: 2}}
                    >

                        <Componente datos={datos} cerrar={cerrar} realizado={realizado}/>

                    </Grid>


                </Grid>

            </Dialog>
        )
    }, [])

    return {
        Dialogo,
        abrir,
        cerrar,
    }
}