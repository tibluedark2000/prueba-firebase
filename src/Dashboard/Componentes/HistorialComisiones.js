import { Grid2, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useResponsive } from "../../Modulo_responsive/Hooks/useResponsive";
import { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fire } from '../../fire'; // Asegúrate de que la ruta sea correcta
import { usuarioContext } from "../../App";


const HistorialComisiones = () => {
    const cData = useContext(usuarioContext)
    console.log(cData);
    const usuario = cData?.usuario;
    const usuarioId = usuario.id;
    const { sCell } = useResponsive()
    const [comisiones, setComisiones] = useState([]);

    useEffect(() => {
        const fetchComisiones = async () => {
            const comisionesCollection = collection(fire, 'comisiones'); // Cambia 'comisiones' por el nombre de tu colección
            const q = query(comisionesCollection, where('idUsuario', '==', usuarioId)); // Filtra por idUsuario
            const comisionesSnapshot = await getDocs(q);
            const comisionesList = comisionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // En setComisiones asignarle comisionesList pero ordenado por fecha descendente
            setComisiones(comisionesList.sort((a, b) => new Date(b.fecha.seconds * 1000) - new Date(a.fecha.seconds * 1000)));
            // setComisiones(comisionesList);
        };

        fetchComisiones();
    }, [usuarioId, usuario, usuario.comisiones]);

    const formatDate = (dateString) => {
        console.log(dateString.seconds);
        // Convertir timestamp a formato de fecha y hora dd/mm/aaaa hh:mm:ss 
        const date = new Date(dateString.seconds * 1000);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    };

    return (
        <Grid2 container size={12}
            sx={{
                border: 1,
                borderColor: '#ffffff50',
                borderRadius: 3,
                p: 3,
                alignItems: 'center',
                justifyContent: 'flex-end',
                background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)',
            }}
        >


            <Grid2 container size={12} sx={{ pr: sCell ? 0 : 4 }}>
                <Typography sx={{ color: '#fff', fontSize: 24, fontWeight: 600, lineHeight: 1.1 }}>Historial de Comisiones</Typography>
            </Grid2>
            {/* Si no hay comisiones mostrar esto */}
            {comisiones.length === 0 ? (
                <Grid2 container size={12} sx={{ marginTop: 1 }}>
                    <Typography sx={{ color: '#fff', fontSize: 14, fontWeight: 200 }}>No hay registros</Typography>
                </Grid2>
            ) : (
                <Grid2 container size={12} sx={{ marginTop: 1 }}>

                    <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
                        <Table stickyHeader>
                            <TableHead sx={{}}>
                                <TableRow>
                                    <TableCell align="left" sx={{ minWidth: 200, textAlign: 'center', background: '#111111', color: '#fff' }}>Descripción</TableCell>
                                    <TableCell sx={{ textAlign: 'center', background: '#111111', color: '#fff' }}>Valor</TableCell>
                                    <TableCell sx={{ textAlign: 'center', background: '#111111', color: '#fff' }}>Fecha</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ background: '#1c1c1c' }}>
                                {
                                    comisiones.map((comision) => (
                                        <TableRow hover key={comision.id}>
                                            <TableCell align="left" sx={{ textAlign: 'center', color: '#fff', padding: '5px ' }}>{comision.id}<br />{comision.descripcion}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: '#fff' }}>${comision.cantidad}</TableCell>
                                            <TableCell sx={{ textAlign: 'center', color: '#fff' }}>{formatDate(comision.fecha)}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid2>
            )}
        </Grid2>
    )

}
export default HistorialComisiones