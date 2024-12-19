/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Grid, IconButton, InputAdornment, TextField} from "@mui/material";
import {Brightness1, Delete} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {theme} from "../../Tema";


const IngresoTextoLista = ({
                               props,
                               nombre,
                               dato,
                               lineas = 1,
                               Icono = Brightness1,
                               requerido = false,
                               size = 'small',
                               type = 'text',
                               editable = true,
                               spacing = 2
                           }) => {
    const {register, errors, getValues, setValue} = props
    const [items, setItems] = useState([''])

    const agregarItem = () => {
        setItems((arr) => arr.concat(''))
    }
    const elimarItem = (item) => {

        let itemsForms = getValues(dato)
        let arr = []

        for (let i = 0; i < itemsForms.length; i++) {
            if (item !== itemsForms[i]) {
                arr.push(itemsForms[i])
            }
        }
        setValue(dato, arr)
        setItems(arr)

    }


    useEffect(() => {

        let itemsForms = getValues(dato)
        if (itemsForms) {
            setItems(itemsForms)
        }


    }, [getValues]);
    return (<Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={spacing}
        >

            {items.map((item, index) => {
                return (
                    <>
                        <Grid item container lg={11} sm={11} xs={11} sx={{justifyContent: 'flex-start', pr: 2}}>
                            <TextField
                                InputProps={lineas > 1 ? {disableUnderline: true} : {
                                    startAdornment: (<InputAdornment position="start">
                                        <Icono color={'primary'}/>
                                    </InputAdornment>), disableUnderline: true

                                }}
                                disabled={!editable}
                                fullWidth
                                size={size}
                                label={nombre + ' ' + (index + 1)}
                                multiline={lineas > 1} rows={lineas}
                                type={type}
                                {...register((dato + '.' + index), {required: requerido})}
                                error={!!errors[dato]}
                                helperText={errors[dato]?.message}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </Grid>

                        <Grid item container lg={1} sm={1} xs={1} sx={{justifyContent: 'flex-end'}}>
                            <IconButton

                                onClick={() => elimarItem(item)}>
                                <Delete/>
                            </IconButton>

                        </Grid>

                    </>
                )
            })}

            <Grid item container lg={6} sm={6} xs={6} sx={{justifyContent: 'flex-start'}}>
                <Button
                    onClick={() => agregarItem()}
                    color={'primary'} variant={'outlined'} sx={{color: theme.palette.primary.main, width: 150}}>
                    {'Adicionar'}</Button>
            </Grid>


        </Grid>

    )

}
export default IngresoTextoLista