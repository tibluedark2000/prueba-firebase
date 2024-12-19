/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, TextField} from "@mui/material";
import {Brightness1} from "@mui/icons-material";
import {Controller} from "react-hook-form";


const IngresoSelectFuncion = ({
                                  props,
                                  nombre,
                                  dato,
                                  Icono = Brightness1,
                                  requerido = false,
                                  size = 'small',
                                  editable = true,
                                  opciones = [],
                                  setDato
                              }) => {
    const {register, errors, control} = props




    return (
        <FormControl fullWidth>
            <InputLabel
                error={!!errors[dato]}
                shrink
                sx={{backgroundColor: '#ffffff00', px: 1, marginLeft: -1, marginTop: 1.5}}
                id={"labelId"}>{nombre}</InputLabel>
            <Controller
                name={dato}
                control={control}
                defaultValue=""
                render={({field: {onChange, value}}) =>

                {
                    setDato(value)
                    return (
                        <TextField
                            disabled={!editable}
                            select
                            {...register(dato, {required: requerido})}
                            defaultValue="1"
                            id={dato}
                            size={size}
                            value={value}
                            onChange={(e) => {
                                setDato(e.target.value)
                                onChange(e)
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icono color={'success'}/>
                                    </InputAdornment>
                                ),
                                disableUnderline: true,

                            }}
                        >
                            {opciones.map((c, i) => (
                                <MenuItem key={`c-${i}`} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </TextField>
                    )
                }
                    }
/>
    <FormHelperText error={!!errors[dato]}>{errors[dato]?.message}</FormHelperText>
</FormControl>
)

}
export default IngresoSelectFuncion
