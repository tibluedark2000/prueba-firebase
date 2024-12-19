/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {FormControl, FormControlLabel, FormLabel, Switch} from "@mui/material";
import {Controller} from "react-hook-form";
import {useEffect, useState} from "react";


const IngresoSwich = ({
                          props,
                          nombre,
                          dato
                      }) => {
    const {register, errors, control, getValues, watch, setValue} = props
    const [texto, setTexto] = useState('No')
    const [selec, setSelec] = useState(false)

    const cambio = (e) => {
        setTexto(e ? 'Si' : 'No')
        setSelec(e)
        setValue(dato, e)
    }

    useEffect(() => {

        let este = getValues()
        if (este[dato]) {
            cambio(true)
        } else {
            cambio(false)
        }


    }, [watch(dato)]);
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ml: 0}}>{nombre}</FormLabel>
            <Controller
                rules={{required: true}}
                control={control}
                name={dato}
                render={({field, value}) => (
                    <FormControlLabel
                        control={<Switch
                            checked={selec}
                            value={selec}
                            onChange={(e) =>
                                cambio(e.target.checked)
                            }/>}
                        label={texto}/>
                )}
            />
        </FormControl>
    )

}
export default IngresoSwich