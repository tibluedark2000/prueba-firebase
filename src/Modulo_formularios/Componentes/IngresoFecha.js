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
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    TextField,
    useMediaQuery
} from "@mui/material";
import {AccountCircle, Brightness1, CalendarMonth} from "@mui/icons-material";
import {Controller} from "react-hook-form";
import {forwardRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {theme} from "../../Tema";


const IngresoFecha = ({
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
    const sCell = useMediaQuery(theme.breakpoints.only('xs'))


    const ExampleTextField = forwardRef(({value, onClick, label, onChange}, ref) => (


        <TextField
            label={label}
            onClick={() => editable ? onClick() : alert("Fecha no editable")}
            value={value}
            disabled={!editable}
            size={size}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <CalendarMonth/>
                    </InputAdornment>

                ),
                disableUnderline: true
            }}
        />


    ));


    const cambio = (date) => {
        let dateTime = new Date(date).getTime()
        props.setValue(dato, dateTime)

    }

    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    const monCell = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


    const locale = {
        localize: {
            day: n => days[n],
            month: n => sCell ? monCell[n] : months[n]
        },
        formatLong: {
            date: () => sCell ? 'dd/mm/yy' : 'dd/mm/yyyy'
        }
    }

    return (
        <Controller
            name={dato}
            control={control}
            defaultValue={new Date().getTime()}
            render={({field: {onChange, value}}) => (
                <DatePicker
                    locale={locale}
                    dateFormat={sCell ? "dd MMMM yy" : "dd MMMM yyyy"}
                    selected={value}
                    onChange={(date) => cambio(date)}
                    customInput={<ExampleTextField Icono={Icono} label={nombre} value={value} onChange={onChange}/>}
                    withPortal
                    showMonthDropdown
                    showYearDropdown
                    yearDropdownItemNumber={70}
                    scrollableYearDropdown

                />
            )}
        />
    )

}
export default IngresoFecha
