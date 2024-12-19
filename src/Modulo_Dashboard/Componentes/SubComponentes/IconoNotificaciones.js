/**************************************************
 * Nombre:       IconoAvatarPerfil
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Badge, IconButton, Popover, Typography } from "@mui/material";
import usus from "../../../Recursos/usuario_defecto.jpg";
import { useContext, useEffect, useState } from "react";
import { NotificationsOutlined } from "@mui/icons-material";
import { TEXTO } from "../../ContantesColor";
import Barra_NotificacionesEmergente from "../ComponentesEditables/Barra_NotificacionesEmergente";
import { contexBarra } from "../../../Dashboard/Dashboard";
import { usuarioContext } from "../../../App";
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { fire } from "../../../fire";

const IconoNotificaciones = ({ openPerfilNotificacion, setOpenPerfilNotificaciones }) => {
    const [elemetoPadre, setElementoPadre] = useState(null)
    const cData = useContext(contexBarra)

    const cDataU = useContext(usuarioContext)
    const usuario = cDataU?.usuario;

    const abrir = (e) => {
        setElementoPadre(e.target)
        setOpenPerfilNotificaciones(true)
    }

    const cerrar = (e) => {
        setElementoPadre(null)
        setOpenPerfilNotificaciones(false)
        console.log("Se cerró");
        // Se van a marcar todas las notificaciones de este usuario como leidas en firebase
        // Filtrar las notificaciones que están visibles y no vistas
        const notificacionesAVer = notificaciones.filter(notificacion => !notificacion.visto);
        console.log(notificacionesAVer);

        notificacionesAVer.forEach(async (notificacion) => {
            const docRef = doc(fire, "notificaciones", notificacion.id);
            await updateDoc(docRef, { visto: true });
        });


    }

    const [notificaciones, setNotificaciones] = useState([])
    const [nuevasNotificaciones, setNuevasNotificaciones] = useState(0)

    useEffect(() => {
        // Buscar todas las notificaciones del usuario en firebase
        const fetchNotificaciones = async () => {
            const notificacionesCollection = collection(fire, 'notificaciones');
            const q = query(notificacionesCollection, where('idUsuario', '==', usuario.id)); // Filtra por idUsuario
            const notificacionesSnapshot = await getDocs(q);
            const notificacionesList = notificacionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNotificaciones(notificacionesList.sort((a, b) => new Date(b.fecha.seconds * 1000) - new Date(a.fecha.seconds * 1000)));
            // setNotificaciones(notificacionesList);
        }
        // Buscar todas las notificaciones del usuario en firebase que no estén leidas
        const fetchNuevas = async () => {
            const notificacionesCollection = collection(fire, 'notificaciones');
            const q = query(notificacionesCollection, where('idUsuario', '==', usuario.id), where('visto', '==', false)); // Filtra por idUsuario
            const notificacionesSnapshot = await getDocs(q);
            const notificacionesList = notificacionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNuevasNotificaciones(notificacionesList.length)
        }
        fetchNotificaciones();
        fetchNuevas();
    }, [usuario.id, notificaciones]);


    // console.log(nuevasNotificaciones, notificaciones);
    return (
        <>
            <IconButton onClick={(e) => abrir(e)}>
                <Badge color="warning" badgeContent={cData?.nuevasNotificaciones} variant='standard' sx={{
                    "& .MuiBadge-badge": {
                        color: "#fff",
                        fontWeight: 600
                    }
                }}>
                    <NotificationsOutlined src={usus} sx={{ width: 20, height: 20, cursor: 'pointer', fill: '#fff' }}

                    />
                </Badge>
                {/* Mostrar un punto rojo para notificaciones nuevas */}
                {nuevasNotificaciones > 0 && <div className="nuevas-notificaciones">
                    <div className="punto-rojo" style={{ backgroundColor: ' #FF0000', width: '8px', height: '8px', borderRadius: '50%', position: 'absolute', top: '0', right: '0' }}>
                    </div>
                    <Typography sx={{ color: 'white', fontSize: 12, fontWeight: 500 }}>{nuevasNotificaciones}</Typography>
                </div>}



            </IconButton>
            <Popover
                open={openPerfilNotificacion}
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
                <Barra_NotificacionesEmergente notificaciones={notificaciones} nuevasNotificaciones={nuevasNotificaciones} />
            </Popover>

        </>

    )

}
export default IconoNotificaciones