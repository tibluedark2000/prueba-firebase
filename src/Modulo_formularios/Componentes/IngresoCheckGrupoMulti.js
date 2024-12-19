/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {
    Checkbox,
    FormControl,
    FormControlLabel, FormGroup,
    FormLabel,
    Grid,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {Brightness1} from "@mui/icons-material";
import {Controller} from "react-hook-form";
import {useEffect, useState} from "react";


const IngresoCheckGrupoMulti = ({
                                    props,
                                    nombre,
                                    dato,
                                    lineas = 1,
                                    Icono = Brightness1,
                                    requerido = false,
                                    size = 'small',
                                    type = 'text',
                                    editable = true,
                                    opciones = []
                                }) => {
    const {register, errors, control, setValue, getValues, watch} = props
    const [arr, setArr] = useState([])
    const [categorias, setCategorias] = useState([])

    const cambios = (e) => {
        let casilla = e.target.value
        let marcada = e.target.checked

        let arr_ = arr

        if (marcada) {
            arr_.push(casilla)
        } else {
            const index = arr_.indexOf(casilla);
            if (index > -1) { // only splice array when item is found
                arr_.splice(index, 1); // 2nd parameter means remove one item only
            }
        }

        setArr(arr_)
        setValue(dato, arr_)

    }


    useEffect(() => {

        let entidad = getValues()
        let categorias_ = entidad.categorias ? entidad.categorias : []

        setArr(categorias_)

        setCategorias([])
        for (let i = 0; i < opciones.length; i++) {
            let opcion = opciones[i]
            let obj = {
                nombre: opcion,
                check: false
            }
            if (categorias_.findIndex((e) => e === opcion) >= 0) {
                obj.check = true
            }

            setCategorias((arr) => arr.concat(obj))
        }

    }, [opciones, watch('categorias')])
    return (

        <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ml: -1}}>{nombre}</FormLabel>


            <FormGroup row onChange={(e) => cambios(e)}>
                {categorias.map((it, index) => {

                    return (
                        <FormControlLabel
                            key={`wd${index}`}
                            control={<Checkbox value={it.nombre} checked={it.check}/>}
                            label={it.nombre}
                            labelPlacement={'end'}
                        />
                    )
                })}
            </FormGroup>


        </FormControl>
    )

}
export default IngresoCheckGrupoMulti

