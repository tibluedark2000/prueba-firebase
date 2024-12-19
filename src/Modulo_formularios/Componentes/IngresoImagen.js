/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Fab, Grid, InputAdornment, TextField} from "@mui/material";
import {
    AddAPhoto,
    Brightness1,
} from "@mui/icons-material";
import imgDefecto from '../Recursos/imgDefecto.svg'
import {useEffect, useState} from "react";


const IngresoImagen = ({
                           props,
                           dato,

                       }) => {
    const {getValues, setValue, watch} = props
    const [imagen, setImagen] = useState('')

    const ingresoImagen = (data) => {
        if (data.target.files && data.target.files[0]) {
            setValue(dato, data.target.files[0])
        }
    }


    useEffect(() => {
        let obj = getValues()

        if (typeof obj[dato] === 'object') {
            setImagen(URL.createObjectURL(obj[dato]))
        } else {
            setImagen(obj[dato])
        }


    }, [watch(dato)]);
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                <img src={imagen ? imagen : imgDefecto} width={150} height={'auto'}/>
            < /Grid>

            <Grid item container lg={12} sm={12} xs={12}
                  sx={{justifyContent: 'center', marginTop: -5, mr: -15}}>
                <Fab
                    variant="contained"
                    component="label"
                    sx={{p: 2}}
                >
                    <input
                        type="file"
                        hidden
                        onChange={ingresoImagen}

                    />
                    <AddAPhoto color={'primary'} sx={{width: 30, height: 30}}/>

                </Fab>
            </Grid>


        </Grid>

    )

}
export default IngresoImagen
