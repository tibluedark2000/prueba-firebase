import {useState} from "react";
import {InputAdornment, MenuItem, TextField} from "@mui/material";
import {Filter} from "iconsax-react";
import {orderBy} from "firebase/firestore";

export const useOrden = ({defecto = "nombre", Icono = Filter, campos = []}) => {
    const [filtro, setFiltro] = useState(defecto)
    const [orders, setOrders] = useState(orderBy(defecto, "desc"))

    const cambio = (e) => {
        setFiltro(e)
        setOrders(orderBy(e, "desc"))
    }

    const Filtros = () => {
        return (
            <TextField
                select
                label={"Ordenar Por"}
                size={"small"}
                value={filtro}
                onChange={(e) => cambio(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Icono variant={"Bold"}/>
                        </InputAdornment>
                    ),
                    disableUnderline: true
                }}

            >

                {campos.map((item) => {
                    return (
                        <MenuItem
                            key={item}
                            value={item}
                        >{item}</MenuItem>
                    )
                })}


            </TextField>
        )
    }

    return {
        orders,
        Filtros

    }
}