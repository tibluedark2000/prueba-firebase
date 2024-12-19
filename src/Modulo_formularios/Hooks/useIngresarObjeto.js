import {Button, Dialog, Grid, IconButton, Typography, useMediaQuery} from "@mui/material";
import {Add, Close, Delete} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useFormulario} from "./useFormulario";
import {theme} from "../../Tema";

export const useIngresarObjeto = ({props, nombre = '', Formulario, dato, Tarjeta}) => {
    const sCell = useMediaQuery(theme.breakpoints.only('xs'))
    const [open, setOpen] = useState(false)
    const {props: propsFormulario, obtenerEntidad, limpiarEntidad, setEntidad} = useFormulario({valoresDefecto: {}})
    const [items, setItems] = useState([])
    const [indexActual, setIndexActual] = useState(0)

    const ingresar = () => {
        obtenerEntidad().then((entidad) => {
            setOpen(false)
            console.log('entidadInterna', entidad)
            props.props.setValue(dato + '.' + indexActual, entidad)
            limpiarEntidad()
        })

    }


    const borrarItem = (index) => {
        let productos = props.props.getValues(dato)
        let arr = []
        for (let i = 0; i < productos.length; i++) {
            if (index !== i) {
                arr.push(productos[i])
            }
        }

        props.props.setValue(dato, arr)

    }


    const agregarItem = () => {
        setOpen(true)
        setIndexActual(items.length)
        // no quitar estos dos (son funcionales)
        setEntidad({})
        setEntidad({})

    }

    const editarItem = (item, i) => {
        setOpen(true)
        setIndexActual(i)
        setEntidad(item)

    }

    useEffect(() => {

        if (props.props.getValues(dato) && props.props.getValues(dato).length > 0) {
            let itemsLista = props.props.getValues(dato)
            setItems(itemsLista)

        } else {
            setItems([])
        }

    }, [props.props.watch(dato)])
    const IngresarObjeto = ({editable = true}) => {

        return (
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >


                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start', marginTop: -1}}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                    >

                        {items.map((item, index) => {
                            return (
                                <>
                                    <Grid key={`Ha${index}`} item container lg={11} sm={11} xs={11}
                                          sx={{justifyContent: 'flex-start', pr: 2}}>
                                        <Tarjeta item={item} click={editarItem} index={index}/>
                                    </Grid>

                                    <Grid item container lg={1} sm={1} xs={1}
                                          sx={{justifyContent: 'flex-end', marginBottom: -0.2}}>
                                        <IconButton
                                            disabled={!editable}
                                            onClick={() => borrarItem(index)}
                                        >
                                            <Delete/>
                                        </IconButton>
                                    </Grid>

                                </>
                            )
                        })}

                    </Grid>
                </Grid>

                <Grid item container lg={12} sm={12} xs={12}
                      sx={{justifyContent: 'flex-start', marginTop: items.length > 0 ? 2 : -0.5}}>
                    <Button
                        disabled={!editable}
                        onClick={() => agregarItem()}
                        variant={'outlined'} startIcon={<Add/>}
                        sx={{color: theme.palette.primary.main}}
                    > Agregar </Button>
                </Grid>


                <Dialog open={open} maxWidth={sCell ? 'xs' : 'md'} fullWidth={sCell}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{p: 2, width: sCell ? '100%' : 400}}
                    >


                        <Grid item container lg={10} sm={10} xs={10} sx={{justifyContent: 'flex-start'}}>
                            <Typography>{nombre}</Typography>
                        </Grid>


                        <Grid item container lg={2} sm={2} xs={2} sx={{justifyContent: 'flex-end'}}>
                            <IconButton
                                onClick={() => setOpen(false)}
                            >
                                <Close/>
                            </IconButton>
                        </Grid>


                        <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-start', marginTop: 1}}>
                            <Formulario props={propsFormulario}/>
                        </Grid>


                        <Grid item container lg={12} sm={12} xs={12}
                              sx={{justifyContent: 'center', marginTop: 3, marginBottom: 2}}>
                            <Button
                                //  onClick={() => indexActual === items.length ? ingresar() : actualizar()}
                                onClick={() => ingresar()}
                            >{indexActual === items.length ? nombre : 'Actualizar'}</Button>
                        </Grid>

                    </Grid>
                </Dialog>

            </Grid>
        )
    }


    return {
        IngresarObjeto,
    }

}