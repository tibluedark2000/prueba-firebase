// Aqui se mostrará la informacion de los binarios directos
import { useState, useContext } from "react";
import { useEffect } from "react";
import { Grid2, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { usuarioContext } from "../../App";
import { obtenerDoc } from "../../Servicios/BD/obtenerDoc";
import { guardarDoc } from "../../Servicios/BD/guardarDoc";
import { actualizarDoc } from "../../Servicios/BD/actualizarDoc";

const InformacionBinariosDirectos = () => {
    // 
    const cData = useContext(usuarioContext)
    console.log(cData);
    const usuario = cData?.usuario;
    console.log('Informacion_Binarios_Directos', usuario)
    console.log(usuario.directo_izquierdo);


    const [directoIzquierdo, setDirectoIzquierdo] = useState(null);
    const [directoDerecho, setDirectoDerecho] = useState(null);
    // Para los puntos por izquierda y por derecha
    const [puntosIzquierda, setPuntosIzquierda] = useState(0);// Puntos por izquierda
    const [puntosDerecha, setPuntosDerecha] = useState(0);// Puntos por derecha
    // Para las comisiones
    const [comisiones, setComisiones] = useState(0);
    const [openDialog, setOpenDialog] = useState(false); //Para manejar el dialogo
    const [puntosMenor, setPuntosMenor] = useState(0);

    useEffect(() => {
        if (usuario.puntos_derecho) {
            setPuntosDerecha(usuario.puntos_derecho)
        }
        if (usuario.puntos_izquierdo) {
            setPuntosIzquierda(usuario.puntos_izquierdo)
        }
        if (usuario.comisiones) {
            setComisiones(usuario.comisiones)
        }
        setPuntosMenor(puntosIzquierda < puntosDerecha ? puntosIzquierda : puntosDerecha);
        const fetchDirectos = async () => {
            if (usuario.directo_izquierdo) {
                const directoIzquierdoData = await obtenerDoc('usuarios', usuario.directo_izquierdo);

                if (directoIzquierdoData.data) {
                    setDirectoIzquierdo(directoIzquierdoData.data);
                } else {
                    console.log("No such document!");
                }
            }
            if (usuario.directo_derecho) {
                const directoDerechoData = await obtenerDoc('usuarios', usuario.directo_derecho);

                if (directoDerechoData.data) {
                    setDirectoDerecho(directoDerechoData.data);
                } else {
                    console.log("No such document!");
                }
            }
        };

        fetchDirectos();
    }, [usuario.directo_izquierdo, usuario.directo_derecho, usuario.puntos_izquierdo, usuario.puntos_derecho, usuario.comisiones, puntosIzquierda, puntosDerecha, usuario]);

    // handle para abrir un dialogo para hacer el choque de puntos. 
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    // handle para cerrar el dialogo
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const confirmarChoquePuntos = async () => {
        // Validar si tiene ambos directos para hacer choque de puntos
        if (!usuario.puntos_izquierdo || !usuario.puntos_derecho) {
            console.warn(`El usuario ${usuario.id} no puede hacer choque de puntos...`);
            return;
        }
        let puntosIzquierdo = usuario.puntos_izquierdo;
        let puntosDerecho = usuario.puntos_derecho;
        let puntosMenor = Math.min(puntosIzquierdo, puntosDerecho);
        console.log(`El menor de ${puntosIzquierdo} y ${puntosDerecho} es ${puntosMenor}`);

        let comision = puntosMenor * 0.07;
        console.log(`La comision es ${comision}`);
        // Agregar comision al usuario que hizo el choque de puntos
        if (!usuario.comisiones) {
            usuario.comisiones = comision;
        } else {
            usuario.comisiones += comision;
        }
        // Agregar la comision a la BD en la coleccion de comisiones
        let descripcion = `Comisión del 7% por choque de puntos. Puntos del equipo más débil: ${puntosMenor}`;
        agregarComision(usuario, comision, descripcion);

        console.log(`Comisiones de ${usuario.id}: ${usuario.comisiones}`);
        // Restar el menor de los puntos_izquierdo y puntos_derecho
        usuario.puntos_izquierdo -= puntosMenor;
        usuario.puntos_derecho -= puntosMenor;
        usuario.puntos_izquierdo_restantes = usuario.puntos_izquierdo;
        usuario.puntos_derecho_restantes = usuario.puntos_derecho;

        // Hacer cero todos los puntos de los usuarios que esten en su tramo izquierdo y derecho
        usuario.tramo_izquierdo.forEach((usuario) => {
            usuario.puntos = 0;
        });
        usuario.tramo_derecho.forEach((usuario) => {
            usuario.puntos = 0;
        });
        console.log(usuario);
        // Actualizar el usuario en la BD
        await actualizarDoc('usuarios', usuario.id, usuario);
        setOpenDialog(false);
        setPuntosDerecha(usuario.puntos_derecho);
        setPuntosIzquierda(usuario.puntos_izquierdo);
        // Mostrar una alerta de que se hizo el choque de puntos
        alert(`${usuario.nombre} has hecho choque de puntos. Comision: ${comision.toFixed(2)}. Puedes revisar tu historial de comisiones.`);


    }

    // Funcion para agregar la comision a la BD en firebase
    const agregarComision = async (usuario, cantidad, descripcion) => {
        let idComision = "COM" + new Date().getTime();

        let datos = {
            id: idComision,
            idUsuario: usuario.id,
            cantidad: cantidad.toFixed(2),
            descripcion,
            fecha: new Date()
        }
        // Agregarla a firebase
        await guardarDoc('comisiones', datos);

        console.log("Datos: ", datos);
    }

    return (
        <Grid2 container
            size={12}
            sx={{
                p: 3,
                background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)',
                border: 1,
                borderColor: '#ffffff40',
                borderRadius: 3,
                pb: 4
            }}
        >
            <Grid2 container size={12} sx={{ pr: 4, mb: 2 }}>
                <Typography sx={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>Información de los Binarios</Typography>
            </Grid2>
            <Grid2 container size={12}>
                <Grid2 container size={12} sx={{ justifyContent: 'flex-start' }}>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Directo izquierdo:</Typography>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>
                        {directoIzquierdo ? `${directoIzquierdo.nombre} ` : 'No hay directo izquierdo'}
                    </Typography>
                    <Typography sx={{ color: '#00ff61', fontSize: 16, fontWeight: 400, margin: '0px 0px 0px 5px' }}>
                        {directoIzquierdo ? ` (${directoIzquierdo.correo})` : ''}
                    </Typography>
                </Grid2>

                <Grid2 container size={12} sx={{ justifyContent: 'flex-start' }}>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Directo derecho:</Typography>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>
                        {directoDerecho ? `${directoDerecho.nombre} ` : 'No hay directo derecho'}
                    </Typography>
                    <Typography sx={{ color: '#03A9F4', fontSize: 16, fontWeight: 400, margin: '0px 0px 0px 5px' }}>
                        {directoDerecho ? ` (${directoDerecho.correo})` : ''}
                    </Typography>
                </Grid2>

                <Grid2 container size={12} sx={{ justifyContent: 'flex-start' }}>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Comisiones:</Typography>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>{comisiones.toFixed(2)}</Typography>
                </Grid2>

                <Grid2 container size={12} sx={{ justifyContent: 'flex-start' }}>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Puntos tramo izquierdo:</Typography>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>{puntosIzquierda}</Typography>
                </Grid2>

                <Grid2 container size={12} sx={{ justifyContent: 'flex-start' }}>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Puntos tramo derecho:</Typography>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>{puntosDerecha}</Typography>
                </Grid2>

                {/* Boton para realizar choque de puntos */}
                {puntosIzquierda > 0 && puntosDerecha > 0 && (
                    <Grid2 container size={12} sx={{ justifyContent: 'flex-start', mt: 2 }}>
                        <Button color="primary" variant="contained" sx={{ fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px', '&:hover': { background: '#fff', color: '#000' } }} onClick={() => handleOpenDialog()}>Realizar choque de puntos</Button>
                    </Grid2>
                )}

            </Grid2>

            {/* Dialogo para realizar choque de puntos. Se da una informacion con la comision 
    //que se haría hasta el momento, con los puntos en izq y der, su diferencia y su calculo de comisiones.
    // y se pide confirmar o cancelar */}
            <Dialog open={openDialog} onClose={handleCloseDialog} >
                <Grid2 container size={12} sx={{ justifyContent: 'center', alignItems: 'center', pt: 2, pb: 2, pl: 2, pr: 2, backgroundColor: '#2C2C2C' }}>
                    <DialogTitle sx={{}}>
                        <Grid2 container size={12} sx={{ justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #fff' }}>
                            <Typography sx={{ color: '#fff', fontSize: 24, fontWeight: 600 }}>Choque de puntos</Typography>
                        </Grid2>
                    </DialogTitle>

                    {/* Verificar si tiene puntos a izq y der se muestra el proceso sino no */}
                    {!puntosIzquierda || !puntosDerecha ? (
                        <DialogContent>
                            <Grid2 container size={12} sx={{ justifyContent: 'center', alignItems: 'center', pt: 2, pb: 2, pl: 2, pr: 2 }}>
                                <Typography sx={{ color: '#fff', fontSize: 18, fontWeight: 200 }}>No se puede realizar choque de puntos</Typography>
                            </Grid2>
                        </DialogContent>
                    ) : (
                        <>
                            <DialogContent sx={{}}>
                                <Grid2 sx={{ margin: '0px 0px 10px 0px', textAlign: 'center' }}>
                                    {/* Mostrarle información en un texto sobre lo que se va a realizar si confirma */}
                                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>
                                        Para realizar el choque de puntos debes tener en cuenta: se compara los puntos izquierdo con puntos derecho y se elige el menor. Se comisiona el 7% del menor.
                                    </Typography>
                                </Grid2>


                                <Grid2 container size={12} sx={{ justifyContent: 'center' }}>
                                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Puntos del equipo más débil:</Typography>
                                    <Typography sx={{ color: '#00ff61', fontSize: 16, fontWeight: 200 }}>{puntosMenor}</Typography>
                                </Grid2>

                                <Grid2 container size={12} sx={{ justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Comisión del 7%:</Typography>
                                    <Typography sx={{ color: '#00ff61', fontSize: 16, fontWeight: 200 }}>$
                                        {(puntosMenor * 0.07).toFixed(2)}
                                    </Typography>
                                </Grid2>

                                <Grid2 container size={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Puntos restantes por izquierda:</Typography>
                                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>
                                        {puntosIzquierda - puntosMenor}
                                    </Typography>
                                </Grid2>
                                <Grid2 container size={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px' }}>Puntos restantes por derecha:</Typography>
                                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>
                                        {puntosDerecha - puntosMenor}
                                    </Typography>
                                </Grid2>
                            </DialogContent>
                        </>
                    )}
                    <DialogActions sx={{}}>
                        <Grid2 container size={12} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Grid2 container size={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button variant="contained" sx={{ background: '#D32F2F', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px', '&:hover': { background: '#FF3D00', color: '#000' } }} onClick={() => handleCloseDialog()}>Cerrar</Button>
                            </Grid2>

                            {puntosIzquierda > 0 && puntosDerecha > 0 && (
                                <Grid2 container size={6} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button variant="contained" sx={{ background: '#388E3C', fontSize: 16, fontWeight: 600, margin: '0px 5px 0px 0px', '&:hover': { background: '#4CAF50', color: '#000' } }} onClick={() => confirmarChoquePuntos()}>Confirmar</Button>
                                </Grid2>
                            )}

                        </Grid2>
                    </DialogActions>

                </Grid2>
            </Dialog>
        </Grid2>
    );
}

export default InformacionBinariosDirectos;