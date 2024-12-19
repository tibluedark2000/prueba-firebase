/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, TextField} from "@mui/material";
import {AccountCircle, Brightness1} from "@mui/icons-material";
import {Controller} from "react-hook-form";


const IngresoSelect = ({
                           props,
                           nombre,
                           dato,
                           Icono = Brightness1,
                           requerido = false,
                           size = 'small',
                           editable = true,
                           opciones = []
                       }) => {
    const {register, errors, control} = props


    return (
        <FormControl fullWidth>
            <InputLabel
                error={!!errors[dato]}
                shrink
                sx={{backgroundColor: '#2b2d30', px: 1, marginLeft: -0.8, marginTop: 0, color: '#fff'}}
                id={"labelId"}>{nombre}</InputLabel>
            <Controller
                name={dato}
                control={control}
                defaultValue=""
                render={({field: {onChange, value}}) => (
                    <TextField
                        disabled={!editable}
                        select
                        focused
                        {...register(dato, {required: requerido})}
                        defaultValue="1"
                        id={dato}
                        size={size}
                        value={value}
                        color={'secondary'}
                        onChange={onChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icono color={'secondary'}/>
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                            sx: {color: '#fff'},
                        }}
                    >
                        {opciones.map((c, i) => (
                            <MenuItem key={`c-${i}`} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <FormHelperText error={!!errors[dato]}>{errors[dato]?.message}</FormHelperText>
        </FormControl>
    )

}
export default IngresoSelect
