/**************************************************
 * Nombre:       Dashboard
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Grid2 } from "@mui/material";
import DashboardBase from "../Modulo_Dashboard/Componentes/DashboardBase";
import React, { createContext, useState } from "react";
import { AccessAlarm, AccountCircle, BarChart, Dashboard as DashFill, HeadsetMic, History } from "@mui/icons-material";
import Seccion_Dashboard from "./Secciones/Seccion_Dashboard";
import Seccion_Historial from "./Secciones/Seccion_Historial";
import Seccion_Planes from "./Secciones/Seccion_Planes";
import Seccion_Soporte from "./Secciones/Seccion_Soporte";
import { funSalir } from "../Servicios/Auth/funSalir";
import SeccionPlanCorredor from "./Secciones/SeccionPlanCorredor";

export const contexBarra = createContext()
const Dashboard = () => {
    const [notificaciones, setNotificaciones] = useState([])
    const [nuevasNotificaciones, setNuevasNotificaciones] = useState(0)
    const [historial, setHistorial] = useState([])
    const [nuevoHistorial, setNuevoHistorial] = useState(0)

    const valoresBarra = {
        notificaciones,
        nuevasNotificaciones,
        historial,
        nuevoHistorial

    }

    const { Provider } = contexBarra;

    return (
        <Grid2
            container
            size={12}
            sx={{ backgroundColor: '#131313' }}
        >
            <Provider value={valoresBarra}>
                <DashboardBase secciones={secciones} seccionesPerfil={seccionesPerfil} salir={funSalir} seccionesID={seccionesID} />
            </Provider>

        </Grid2>
    )

}
export default Dashboard

const secciones = [
    {
        nombre: 'Dashboard',
        icono: DashFill,
        camino: '*',
        categoria: '',
        Componente: <Seccion_Dashboard />
    },
    {
        nombre: 'Planes de Acción',
        icono: BarChart,
        camino: '/Planes',
        categoria: '',
        Componente: <Seccion_Planes />
    },
    {
        nombre: 'Plan Corredor',
        icono: AccessAlarm,
        camino: '/PlanCorredor',
        categoria: '',
        Componente: <SeccionPlanCorredor />
    }

]

const seccionesID = [
    {
        nombre: 'Dashboard',
        icono: DashFill,
        camino: '/Dashboard/:id',
        Componente: <Seccion_Dashboard />
    },


]

const seccionesPerfil = [
    {
        nombre: 'My Profile',
        descripcion: 'Account Settings',
        icono: AccountCircle,
        camino: '/My_Profile',
        Componente: <h1 style={{ height: '150vh', backgroundColor: "pink", width: '100%' }}>My Profile</h1>
    },
    {
        nombre: 'My Task',
        descripcion: 'To-do and Dally Task',
        icono: DashFill,
        camino: '/My_Task',
        Componente: <h1 style={{ height: '150vh', backgroundColor: "pink", width: '100%' }}>My Task</h1>
    },
]

const notificaciones = {}