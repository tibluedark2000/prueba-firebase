/**************************************************
 * Nombre:       IconoAvatarPerfil
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Avatar, Popover} from "@mui/material";
import usus from "../../../Recursos/usuario_defecto.jpg";
import {useState} from "react";
import Barra_PerfilEmergente from "../ComponentesEditables/Barra_PerfilEmergente";

const IconoAvatarPerfil = ({openPerfil, setOpenPerfil, seccionesPerfil}) => {
    const [elemetoPadre, setElementoPadre] = useState(null)

    const abrir = (e) => {
        setElementoPadre(e.target)
        setOpenPerfil(true)
    }

    const cerrar = (e) => {
        setElementoPadre(null)
        setOpenPerfil(false)
    }

    return (
        <>
            <Avatar src={usus} sx={{width: 36, height: 36, cursor: 'pointer'}}
                    onClick={(e) => abrir(e)}
            />
            <Popover
                open={openPerfil}
                anchorEl={elemetoPadre}
                onClose={() => cerrar()}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            boxShadow: '0px 8px 12px 0px #00000014',
                            border: 1,
                            borderColor: 'rgba(143,173,213,0.31)',
                            borderRadius: 2
                        }

                    }
                }}
            >
                <Barra_PerfilEmergente seccionesPerfil={seccionesPerfil}/>
            </Popover>

        </>

    )

}
export default IconoAvatarPerfil