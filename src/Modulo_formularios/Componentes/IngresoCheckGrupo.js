/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {Brightness1} from "@mui/icons-material";
import {Controller} from "react-hook-form";


const IngresoCheckGrupo = ({
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
    const {register, errors, control} = props

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ml: -1}}>{nombre}</FormLabel>
            <Controller
                rules={{required: true}}
                control={control}
                name={dato}
                render={({field}) => (
                    <RadioGroup row {...field} >
                        {opciones.map((it, index) => {
                            return (
                                <FormControlLabel
                                    key={`se${index}`}
                                    value={it}
                                    control={<Radio/>}
                                    label={it}
                                    labelPlacement={'end'}
                                />
                            )
                        })}
                    </RadioGroup>
                )}
            />
        </FormControl>
    )

}
export default IngresoCheckGrupo