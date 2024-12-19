/**************************************************
 * Nombre:       IconoAvatarPerfil
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Badge, Drawer, IconButton} from "@mui/material";
import usus from "../../../Recursos/usuario_defecto.jpg";
import {useContext, useState} from "react";
import {PendingActionsOutlined} from "@mui/icons-material";
import {TEXTO} from "../../ContantesColor";
import Barra_Historial from "../ComponentesEditables/Barra_Historial";
import {contexBarra} from "../../../Dashboard/Dashboard";

const IconoHistorial = () => {
    const [open, setOpen] = useState(false)
    const cData = useContext(contexBarra)

    const abrir = (e) => {
        setOpen(true)
    }

    const cerrar = (e) => {
        setOpen(false)
    }

    return (
        <>
            <IconButton onClick={(e) => abrir(e)} >
                <Badge variant='dot' color={'primary'} badgeContent={cData.nuevoHistorial}>
                    <PendingActionsOutlined src={usus} sx={{width: 20, height: 20, cursor: 'pointer', fill: '#fff'}}

                    />
                </Badge>
            </IconButton>
            <Drawer
                open={open}
                onClose={() => cerrar()}
                anchor={'right'}
            >
                <Barra_Historial historial={cData?.historial} />
            </Drawer>

        </>

    )

}
export default IconoHistorial