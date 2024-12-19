/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {
    FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Rating, TextField
} from "@mui/material";
import {AccountCircle, Brightness1} from "@mui/icons-material";
import {Controller} from "react-hook-form";


const IngresoRating = ({
                           props, nombre, dato, requerido = false, size = 'large', editable = true,

                       }) => {
    const {register, errors, control, setValue} = props


    return (
        <FormControl fullWidth>
            <InputLabel
                error={!!errors[dato]}
                shrink
                sx={{backgroundColor: '#ffffff00', px: 1, marginLeft: 0, marginTop: 0}}
                id={"labelId"}>{nombre}</InputLabel>
            <Controller
                name={dato}
                control={control}
                defaultValue={3}
                render={({field: {onChange, value}}) => (
                    <Rating
                        sx={{marginTop: 1, paddingLeft: 1}}
                        disabled={!editable}
                        // {...register(dato, {required: requerido})}
                        id={dato}
                        size={size}
                        value={value}
                        onChange={(e, value) => {
                            setValue('calificacion', value)
                        }}
                    >

                    </Rating>)}
            />
            <FormHelperText error={!!errors[dato]}>{errors[dato]?.message}</FormHelperText>
        </FormControl>
    )

}
export default IngresoRating
