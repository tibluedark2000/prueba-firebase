// Aqui vamos a mostrar los usuarios que estan en un tramo, ya sea izquierda o derecha
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Grid2, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { usuarioContext } from "../../App";
import { doc, getDoc } from "firebase/firestore";
import { fire } from "../../fire";


const TablaReferidos = ({ lado }) => {
    // 
    const cData = useContext(usuarioContext)
    console.log(cData);
    const usuario = cData?.usuario;

    // const referidosTramoIzquierdo = [];
    // const lado = "izquierda";
    // console.log(lado);

    const [referidosTramoIzquierdo, setReferidosTramoIzquierdo] = useState([]);
    const [referidosTramoDerecho, setReferidosTramoDerecho] = useState([]);
    const [puntosRestantes, setPuntosRestantes] = useState(0);

    useEffect(() => {
        if (lado === "izquierda" && usuario.puntos_izquierdo_restantes) {
            setPuntosRestantes(usuario.puntos_izquierdo_restantes);
        }
        if (lado === "derecha" && usuario.puntos_derecho_restantes) {
            setPuntosRestantes(usuario.puntos_derecho_restantes);
        }
        const fetchReferidos = async () => {
            const referidosIzquierdos = usuario.tramo_izquierdo || [];
            const referidosDerechos = usuario.tramo_derecho || [];

            // Ignorar el primer elemento usando slice(1)
            const referidosIzquierdosData = await Promise.all(referidosIzquierdos.slice(1).map(async (referido) => {
                const docRef = doc(fire, "usuarios", referido.idHijo);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    return { nombre: userData.nombre, correo: userData.correo, puntos: referido.puntos };
                }
                return null;
            }));

            const referidosDerechosData = await Promise.all(referidosDerechos.slice(1).map(async (referido) => {
                const docRef = doc(fire, "usuarios", referido.idHijo);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    return { nombre: userData.nombre, correo: userData.correo, puntos: referido.puntos };
                }
                return null;
            }));

            setReferidosTramoIzquierdo(referidosIzquierdosData.filter(Boolean));
            setReferidosTramoDerecho(referidosDerechosData.filter(Boolean));
        };

        fetchReferidos();
    }, [usuario, lado]);


    console.log(referidosTramoIzquierdo);
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
                <Typography sx={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>Tramo {lado}</Typography>
            </Grid2>

            {/* Si tenia puntos restantes se muestra sino no */}
            {puntosRestantes > 0 && (
                <Grid2 container size={12} sx={{ justifyContent: 'flex-start', marginBottom: 2 }}>
                    <Typography sx={{ color: '#fff', fontSize: 16, fontWeight: 200 }}>
                        Ten en cuenta los puntos restantes del anterior choque de puntos:
                        <span style={{ color: '#00ff61', fontSize: 16, fontWeight: 400, margin: '0px 0px 0px 5px' }}>
                            {puntosRestantes}
                        </span>
                    </Typography>
                </Grid2>
            )}


            {/* Si el usuario tiene en la lista del tramo izquierdo, mostrar la tabla sino le muestra el texto que dice que no hay referidos */}
            {(lado === "izquierda" && referidosTramoIzquierdo.length > 0) || (lado === "derecha" && referidosTramoDerecho.length > 0) ? (
                <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                    {/* Aqui va la tabla responsiva */}
                    <Table stickyHeader sx={{ minWidth: 400 }} size="small" aria-label="tabla de referidos">
                        <TableHead >
                            <TableRow style={{}}>
                                <TableCell sx={{ borderBottom: 'none', background: lado === "izquierda" ? '#12990099' : '#3d00ffcc' }} align="center" >#</TableCell>
                                <TableCell sx={{ borderBottom: 'none', background: lado === "izquierda" ? '#12990099' : '#3d00ffcc' }} align="center">Nombre</TableCell>
                                <TableCell sx={{ borderBottom: 'none', background: lado === "izquierda" ? '#12990099' : '#3d00ffcc' }} align="center">Correo</TableCell>
                                <TableCell sx={{ borderBottom: 'none', background: lado === "izquierda" ? '#12990099' : '#3d00ffcc' }} align="center">Puntos</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ background: '#1c1c1c' }}>
                            {/* Si es lado izquierda, se muestran los referidos del tramo izquierdo */}
                            {lado === "izquierda" && referidosTramoIzquierdo.map((referido, index) => (

                                <TableRow hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    key={referido.idHijo}>
                                    <TableCell align="center" style={{ color: 'white' }}>{index + 1}</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>{referido.nombre}</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>{referido.correo}</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>{referido.puntos}</TableCell>
                                </TableRow>
                            ))}

                            {/* Si es lado derecho, se muestran los referidos del tramo derecho */}
                            {lado === "derecha" && referidosTramoDerecho.map((referido, index) => (
                                <TableRow hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    key={referido.idHijo}>
                                    <TableCell align="center" style={{ color: 'white' }}>{index + 1}</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>{referido.nombre}</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>{referido.correo}</TableCell>
                                    <TableCell align="center" style={{ color: 'white' }}>{referido.puntos}</TableCell>
                                </TableRow>
                            ))}



                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography sx={{ color: '#fff', fontSize: 14, fontWeight: 200 }}>No hay registros</Typography>
            )}


        </Grid2>

    );
}

export default TablaReferidos