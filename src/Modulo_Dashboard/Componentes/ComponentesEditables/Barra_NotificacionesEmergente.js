/**************************************************
 * Nombre:       Barra_PerfilEmergente
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Button, Grid2, Typography, Card } from "@mui/material";
import { TEXTO } from "../../ContantesColor";
import { theme } from "../../../Tema";
import { useState, useEffect, useContext } from "react";
import Tarjeta_Notificaciones from "./SubComponentes/Tarjeta_Notificaciones";
import { usuarioContext } from "../../../App";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fire } from "../../../fire";


const Barra_NotificacionesEmergente = ({ notificaciones, nuevasNotificaciones }) => {

    const cData = useContext(usuarioContext)
    // console.log(cData);
    const usuario = cData?.usuario;


    return (
        <Grid2
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            size={12}
            sx={{ width: 364, background: '#20202020' }}
        >

            <Grid2 size={8} sx={{ borderBottom: '1px solid #000000', paddingBottom: 1, background: '#202020', p: 2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: 18, color: '#fff' }}>Notificaciones</Typography>
            </Grid2>

            <Grid2 size={4} sx={{ marginTop: 0, borderBottom: '1px solid #000000', paddingBottom: 1, background: '#202020', p: 2 }}>
                <Typography sx={{
                    color: '#fff',
                    backgroundColor: theme.palette.primary.main,
                    px: 1,
                    pt: 0.4,
                    pb: 0.4,
                    textAlign: 'center',
                    borderRadius: 4,
                    fontWeight: 500,
                    fontSize: 14
                }}>{`${nuevasNotificaciones} Nuevas`}</Typography>
            </Grid2>


            <Grid2 container item size={12} sx={{ p: 1 }}>
                {notificaciones.map((item, index) => {
                    return (
                        <Grid2
                            item
                            size={12}
                            // Si item.visto==false se muestra con fondo gris
                            key={index}
                            sx={{

                                // marginTop: 3, 
                            }}
                        >
                            <Tarjeta_Notificaciones item={item} />
                        </Grid2>
                    )
                })}
            </Grid2>
            {/* 
            <Grid2 item size={12} sx={{ marginTop: 3 }} >
                <Button fullWidth variant={'outlined'} > See All Notifications  </Button>
            </Grid2> */}


        </Grid2 >
    )

}
export default Barra_NotificacionesEmergente



