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


const IngresoSelectPropId = ({
                                 props,
                                 nombre,
                                 dato,
                                 datoId,
                                 Icono = Brightness1,
                                 requerido = false,
                                 size = 'small',
                                 editable = true,
                                 opciones = [],
                                 propiedad = 'nombre',
                                 propiedadId = 'id',
                             }) => {
    const {register, errors, control} = props


    return (
        <FormControl fullWidth>
            <InputLabel
                error={!!errors[dato]}
                shrink
                sx={{backgroundColor: '#ffffff', px: 1, marginLeft: -0.8, marginTop: 0}}
                id={"labelId"}>{nombre}</InputLabel>
            <Controller
                name={dato}
                control={control}
                defaultValue=""
                render={({field: {onChange, value}}) => (
                    <TextField
                        disabled={!editable}
                        select
                        {...register(dato, {required: requerido})}
                        defaultValue="1"
                        id={dato}
                        size={size}
                        value={value}
                        onChange={(e,s) => {
                            let datoEscogido = e.target.value
                            let index = opciones.findIndex((per) => per[propiedad] === datoEscogido)
                            let idEscogido = opciones[index][propiedadId]
                            props.setValue(dato, datoEscogido)
                            props.setValue(datoId, idEscogido)
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icono color={'primary'}/>
                                </InputAdornment>
                            ),
                            disableUnderline: true,

                        }}
                    >
                        {opciones.map((c, i) => (
                            <MenuItem key={`c-${i}`} value={c[propiedad]}>
                                {c[propiedad]}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
            <FormHelperText error={!!errors[dato]}>{errors[dato]?.message}</FormHelperText>
        </FormControl>
    )

}
export default IngresoSelectPropId
