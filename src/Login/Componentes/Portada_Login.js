/**************************************************
 * Nombre:       Portada_Home
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import { Button, Grid2, Typography } from "@mui/material";
import fondo_img from "../../Recursos/fondo_img.png"
import fondo from "../../Recursos/video_fondo.mp4";
import logo from "../../Recursos/logo.svg";
import { useFormulario } from "../../Modulo_formularios/Hooks/useFormulario";
import Formulario_Login from "../Formularios/Formulario_Login";
import { useLoaders } from "../../Modulo_Loaders/Hooks/useLoaders";
import { theme } from "../../Tema";
import Formulario_Registro from "../Formularios/Formulario_Registro";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useResponsive } from "../../Modulo_responsive/Hooks/useResponsive";
import { funRecuperarContrasena } from "../../Servicios/Auth/funRecuperarContrasena";
import { funIngresarCorreoPass } from "../../Servicios/Auth/funIngresarCorreoPass";
import { funCrearUsuario } from "../../Servicios/Auth/funCrearUsuario";
import { guardarDoc } from "../../Servicios/BD/guardarDoc";
import { getID } from "../../Servicios/BD/useEscucharUsuarioToCorreo";
import { irArriba } from "../../Utilidades/irArriba";

import { useLocation } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import { fire } from "../../fire";
import { obtenerDoc } from "../../Servicios/BD/obtenerDoc";

const Portada_Login = () => {
    const { masSM, sCell, sTab } = useResponsive()
    const parms = useParams()
    const { Cargador, abrirCargador, cerrarCargador } = useLoaders({ logo: logo })
    const { props, obtenerEntidad } = useFormulario({ valoresDefecto: {} })
    const [registro, setRegistro] = useState(false)
    const [referrer, setReferrer] = useState("")

    const ingresar = () => {
        obtenerEntidad().then((entidad) => {
            abrirCargador('Ingresando a panel de control')
            funIngresarCorreoPass(entidad.correo, entidad.pass).then((dox) => {
                if (dox.res) {
                    setTimeout(() => {
                        cerrarCargador()
                    }, 2000)
                } else {
                    alert(dox.data)
                    cerrarCargador()
                }
            })
        })
    }

    const registrarse = () => {
        obtenerEntidad().then((entidad) => {
            abrirCargador('Registrando usuario')
            funCrearUsuario(entidad.correo, entidad.pass).then((dox) => {
                if (dox.res) {
                    crearUsuario(entidad)
                } else {
                    alert(dox.data)
                    cerrarCargador()
                }
            })
        })
    }

    //////////////////
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const referrerId = params.get('ref');
    const ladoReferido = params.get('side');
    // Se va a recibir el parámetro del referido desde 
    // http://localhost:3000/true?ref=referencia_del_usuario
    console.log(`ID del referido: ${referrerId}. Lado: ${ladoReferido}`);

    const crearUsuario = (entidad) => {
        let obj = entidad
        obj.id = getID(entidad.correo)
        obj.tipo = 'usuario'
        obj.fecha = new Date().getTime()
        obj.padre = referrer
        // Crear un array Va a quedar iniciado en vacio
        obj.tramo_izquierdo = []
        obj.tramo_derecho = []
        obj.puntos_izquierdo = 0
        obj.puntos_derecho = 0

        guardarDoc('usuarios', obj).then((dox) => {
            console.log(dox);
            if (dox.res) {
                //Aqui se debe actualizar tambien al usuario de referencia agregarle el hijo
                if (referrer && ladoReferido) {
                    console.log("Se va a actualizar el usuario padre");
                    actualizarUsuarioPadre(referrerId, obj.id, ladoReferido);
                }
                setTimeout(() => {
                    cerrarCargador()
                }, 500)
            }
        })
    }


    const actualizarUsuarioPadre = async (idUsuario, idHijo, lado) => {
        if (idUsuario === "" || !idUsuario || !idHijo || !lado || idHijo === "" || (lado !== 'left' && lado !== 'right')) {
            console.log("No se pudo actualizar el usuario padre: " + idHijo + " " + lado + " " + idUsuario);
            return;
        }
        console.log(`IdUsuario: ${idUsuario}, IdHijo: ${idHijo}, Lado: ${lado}`);

        const usuario = await obtenerDoc('usuarios', idUsuario);
        const usuarioHijo = await obtenerDoc('usuarios', idHijo);

        console.log(usuario);
        console.log(usuarioHijo);

        if (!usuario.data) {
            console.log("Usuario padre no encontrado.");
            return;
        }
        if (!usuarioHijo.data) {
            console.log("Usuario hijo no encontrado.");
            return;
        }

        console.log("Se va a actualizar el usuario padre");

        try {
            const usuarioData = usuario.data;
            const usuarioHijoData = usuarioHijo.data;

            // Verifica si el lado es 'izquierdos' o 'derechos' y actualiza el array correspondiente
            if (lado === 'left') {
                console.log("Se va a actualizar el lado izquierdo");
                let idUsuarioIzq = usuarioData.directo_izquierdo;

                if (!idUsuarioIzq) {
                    console.log("No se encontró un hijo directo a su izquierda.");
                    // Si no hay un hijo directo a su izquierda, asignarlo a su izquierda
                    usuarioData.directo_izquierdo = idHijo;
                    // Asignarle como padre al hijo que tiene el idHijo
                    usuarioHijoData.padre = idUsuario;
                    // Actualizar la rama izquierda
                    // Si no tiene este atributo, lo crea
                    if (!usuarioData.tramo_izquierdo) {
                        usuarioData.tramo_izquierdo = [];
                    }
                    usuarioData.tramo_izquierdo.push({ idHijo, puntos: 0 });

                    // Actualizar el documento del usuario en Firebase
                    await updateDoc(doc(fire, "usuarios", idUsuario), {
                        directo_izquierdo: idHijo,
                        tramo_izquierdo: usuarioData.tramo_izquierdo,
                    });
                    // Actualizar el documento del hijo en Firebase
                    await updateDoc(doc(fire, "usuarios", idHijo), {
                        padre: idUsuario,
                    });

                    // Si con este usuario ya tiene ambos directos, se debe llamar a otra funcion para avisarle y contar 20 días
                    if (usuarioData.directo_derecho) {
                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        console.log("Se va a llamar a la funcion para avisarle y contar 20 dias");
                        await alertaBinario(usuarioData);
                    }

                    await actualizarRamaIzquierda(usuarioData, idHijo);
                } else {
                    // Si ya hay un hijo directo a la izquierda, buscar recursivamente  
                    await actualizarUsuarioPadre(idUsuarioIzq, idHijo, 'left');
                }
                console.log("Elemento agregado exitosamente al array 'izquierdos'");
            } else if (lado === 'right') {
                console.log("Se va a actualizar el lado derecho");
                let idUsuarioDer = usuarioData.directo_derecho;

                if (!idUsuarioDer) {
                    console.log("No se encontró un hijo directo a su derecha.");
                    // Si no hay un hijo directo a su derecha, asignarlo a su derecha
                    usuarioData.directo_derecho = idHijo;
                    // Asignarle como padre al hijo que tiene el idHijo
                    usuarioHijoData.padre = idUsuario;
                    // Actualizar la rama derecha
                    // Si no tiene este atributo, lo crea
                    if (!usuarioData.tramo_derecho) {
                        usuarioData.tramo_derecho = [];
                    }
                    usuarioData.tramo_derecho.push({ idHijo, puntos: 0 });
                    console.log(usuarioData);

                    // Actualizar el documento del usuario en Firebase
                    await updateDoc(doc(fire, "usuarios", idUsuario), {
                        directo_derecho: idHijo,
                        tramo_derecho: usuarioData.tramo_derecho,
                    });
                    // Actualizar el documento del hijo en Firebase
                    await updateDoc(doc(fire, "usuarios", idHijo), {
                        padre: idUsuario,
                    });

                    // Si con este usuario ya tiene ambos directos, se debe llamar a otra funcion para avisarle y contar 20 días
                    if (usuarioData.directo_izquierdo) {
                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        console.log("Se va a llamar a la funcion para avisarle y contar 20 dias");
                        await alertaBinario(usuarioData);
                    }

                    await actualizarRamaDerecha(usuarioData, idHijo);
                    console.log("Elemento agregado exitosamente al array 'derechos'");

                } else {
                    // Si ya hay un hijo directo a la izquierda, buscar recursivamente  
                    await actualizarUsuarioPadre(idUsuarioDer, idHijo, 'right');
                }
            } else {
                console.error("Lado no válido. Debe ser 'izquierdos' o 'derechos'.");
            }
        } catch (error) {
            console.log("Error al agregar el elemento al array: ");
            console.error(error);
        }
    }

    const actualizarRamaIzquierda = async (usuarioData, idHijo) => {
        if (!usuarioData.padre) return;

        const padreDoc = await obtenerDoc('usuarios', usuarioData.padre);
        console.log(padreDoc);
        if (padreDoc.data) {
            const padre = padreDoc.data;
            if (padre.directo_izquierdo === usuarioData.id) {
                // Agregar el hijo a la rama izquierda del padre
                if (!padre.tramo_izquierdo) {
                    padre.tramo_izquierdo = [];
                }
                padre.tramo_izquierdo.push({ idHijo, puntos: 0 });
                // Actualizar el documento del padre en Firebase
                await updateDoc(doc(fire, "usuarios", padre.id), {
                    tramo_izquierdo: padre.tramo_izquierdo,
                });
                // Llamar recursivamente para actualizar los ancestros
                await actualizarRamaIzquierda(padre, idHijo);
            }
        }
    };

    const actualizarRamaDerecha = async (usuarioData, idHijo) => {
        if (!usuarioData.padre) return;

        const padreDoc = await obtenerDoc('usuarios', usuarioData.padre);
        console.log(padreDoc);
        if (padreDoc.data) {
            const padre = padreDoc.data;
            if (padre.directo_derecho === usuarioData.id) {
                // Agregar el hijo a la rama derecha del padre
                if (!padre.tramo_derecho) {
                    padre.tramo_derecho = [];
                }
                padre.tramo_derecho.push({ idHijo, puntos: 0 });
                // Actualizar el documento del padre en Firebase
                await updateDoc(doc(fire, "usuarios", padre.id), {
                    tramo_derecho: padre.tramo_derecho,
                });
                // Llamar recursivamente para actualizar los ancestros
                await actualizarRamaDerecha(padre, idHijo);
            }
        }
    }

    const alertaBinario = async (usuarioData) => {
        // Agregar una notificacion al usuario avisandole que ya tiene ambos directos. Se agrega a la coleccion de notificaciones
        const id = "NOT" + new Date().getTime();
        const notificacion = {
            id: id,
            idUsuario: usuarioData.id,
            mensaje: "¡Ya tienes dos directos registrados! Ya puedes obtener comisiones de las acciones que ellos compren. Además, puedes ganar puntos de la compra de acciones de tus equipos. Recuerda que estos puntos se reiniciarán el día 20 de cada mes.",
            fecha: new Date(),
            visto: false,
        }

        await guardarDoc('notificaciones', notificacion);
        // await reiniciarPuntos();
    };


    const recuperar = () => {
        obtenerEntidad().then((entidad) => {
            abrirCargador('Enviando instrucciones a correo')
            funRecuperarContrasena(entidad.correo).then((dox) => {
                if (dox.res) {
                    alert('Se ha enviado las instrucciones de cambio de contraseña a su correo')
                } else {
                    alert(dox.data)
                }
                cerrarCargador()
            })
        })
    }



    useEffect(() => {
        if (parms && parms.id && parms.id === 'true') {
            console.log("Parece que hay parámetros");
            if (referrerId) {
                const respuesta = obtenerDoc('usuarios', referrerId);
                respuesta.then((dox) => {
                    console.log(dox);
                    if (dox.data) {
                        console.log("El usuario existe");
                        setReferrer(dox.data.id) // Almacena el ID del referente
                        console.log("Refer: ", referrer);

                    } else {
                        console.log("El usuario no existe");
                        setReferrer("")
                        console.log("Refer: ", referrer);
                    }
                })
            }

            setRegistro(true)
        } else {
            console.log("Parece que no hay parámetros");

            setRegistro(false)
        }
    }, [referrerId, parms, referrer]);

    // console.log(actualizarUsuarioPadre(referrerId, "prueba_gmail-com", ladoReferido));


    return (
        <Grid2
            container
            size={12}
            sx={{ marginTop: -14, alignItems: 'flex-start' }}
        >
            <video width={'100%'} height={720}
                style={{
                    objectFit: 'cover',
                    zIndex: 1
                }}
                id="background-video" autoPlay loop muted poster={`url(${fondo_img})`}>
                <source src={fondo} type="video/mp4" />
            </video>


            <Grid2 container size={12} sx={{
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,1) 14%, rgba(0,0,0,0.6306897759103641) 31%, rgba(0,0,0,0.21052170868347342) 48%, rgba(0,0,0,0) 61%)',
                // backgroundColor: 'pink',
                zIndex: 2,
                marginTop: -101,
                alignItems: 'flex-start',

            }}>

                <Grid2 container size={12}
                    sx={{ maxWidth: '1400px', px: 3, marginTop: 12, justifyContent: 'center', pb: 12, pt: 18 }}>

                    <Grid2 container size={{ xs: 12, sm: 6, md: 4 }}
                        sx={{
                            borderRadius: 6,
                            border: 1,
                            borderColor: '#ffffff90',
                            px: !masSM ? 4 : 6,
                            py: 4,
                            backgroundColor: '#ffffff20',
                            backdropFilter: 'blur(10px)'

                        }}
                    >

                        <Cargador />

                        <Grid2 container size={12} sx={{ justifyContent: 'flex-end' }}>
                            <img src={logo} width={150} height={'auto'} />
                        </Grid2>

                        <Grid2 container size={12} sx={{ justifyContent: 'flex-start', marginTop: 4, px: 0 }}>
                            <Typography sx={{
                                fontWeight: 800,
                                fontSize: sCell ? 24 : 32,
                                lineHeight: 1.1,
                                color: theme.palette.primary.main
                            }}>
                                {registro ?
                                    'Crea una cuenta en FoxPlore.'
                                    :
                                    'Iniciar sesión'
                                }
                            </Typography>
                        </Grid2>

                        <Grid2 container size={12} sx={{ justifyContent: 'flex-start', marginTop: 4, px: 0 }}>
                            {registro ?
                                <Formulario_Registro props={props} />
                                :
                                <Formulario_Login props={props} recuperar={recuperar} />
                            }

                        </Grid2>

                        <Grid2 container size={12} sx={{ justifyContent: 'center', marginTop: 4, px: 2 }}>


                            {registro ?
                                <Button
                                    onClick={() => registrarse()}
                                    color={'primary'} fullWidth sx={{ color: '#fff', paddingTop: 1, paddingBottom: 1.2 }}>Crear
                                    cuenta</Button>
                                :
                                <Button
                                    onClick={() => ingresar()}
                                    color={'primary'} fullWidth
                                    sx={{ color: '#fff', paddingTop: 1, paddingBottom: 1.2 }}>Iniciar
                                    sesión</Button>
                            }
                        </Grid2>

                        <Grid2 container size={12} lg={12} sm={12} xs={12}
                            sx={{ justifyContent: 'center', marginTop: 4, marginBottom: 2 }}>
                            <Typography sx={{ color: '#fff', textAlign: 'center' }}>

                                {registro ? 'Ya tengo una cuenta' : '¿Eres nuevo/a en FoxPlore?'}
                                <span
                                    style={{
                                        color: theme.palette.primary.main,
                                        textDecoration: 'underline',
                                        paddingLeft: 5,
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        setRegistro(!registro)
                                        setTimeout(() => {
                                            irArriba()
                                        }, 500)
                                    }
                                    }
                                >
                                    {registro ? 'Iniciar sesión' : 'Registrarse'}
                                </span>
                            </Typography>
                        </Grid2>


                    </Grid2>


                </Grid2>

            </Grid2>


        </Grid2>
    )

}
export default Portada_Login