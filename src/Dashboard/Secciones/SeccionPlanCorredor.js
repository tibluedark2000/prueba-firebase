import { Grid2, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useContext, useState } from "react";
import { usuarioContext } from "../../App";

import InformacionBinariosDirectos from "../Componentes/InformacionBinariosDirectos";
import TablaReferidos from "../Componentes/TablaReferidos";
import HistorialComisiones from "../Componentes/HistorialComisiones";

const SeccionPlanCorredor = () => {
    // 
    const cData = useContext(usuarioContext)
    console.log(cData);
    const usuario = cData?.usuario;
    let codigo = "";

    console.log("Mostrar izquierdos y derechos: ", usuario?.izquierdos, usuario?.derechos);

    const [link, setLink] = useState(""); //Para manejar el link que se va a generar
    const [openDialog, setOpenDialog] = useState(false); //Para manejar el dialogo
    const [side, setSide] = useState(""); //Para manejar el lado de referido izq o der
    const [copied, setCopied] = useState(false); //Para ver si se copio el link


    const handleGenerateLink = (side) => {
        //Generar el link para compartir se usa window.location.origin para obtener la url actual, se puede cambiar luego en  produccion
        // Generar un codigo aleatorio con la fecha y hora actual
        codigo = new Date().getTime();
        const linkReferido = `${window.location.origin}/true?c=${codigo}&ref=${usuario.id}&side=${side}`;
        setLink(linkReferido);
        setSide(side);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Grid2 container spacing={2} sx={{ padding: 2 }}>
            <Grid2 container spacing={2} sx={{ padding: 0, flexDirection: { xs: 'column', md: 'row' } }}>
                <Grid2 xs={12} sx={{ margin: 0, paddingLeft: 3 }}>
                    <Typography variant="h6" color="#fff">Referir usuario</Typography>
                </Grid2>
                <Grid2 item xs={12} md={6}>
                    <Button variant="contained" sx="width: 170px; background-color: #129900; color: #fff; &:hover { background-color: #0e6e00; }" onClick={() => handleGenerateLink("left")}>
                        Por izquierda
                    </Button>
                </Grid2>
                <Grid2 item xs={12} md={6}>
                    <Button variant="contained" sx="width: 170px; background-color: #6100ff; color: #fff; &:hover { background-color: #4d00b3; }" onClick={() => handleGenerateLink("right")}>
                        Por derecha
                    </Button>

                    {/* Boton de prueba */}
                    {/* <Button variant="contained" color="error" onClick={() => agregarBinario(usuario.id, "prueba", "derechos")
                    }>
                        Prueba
                    </Button> */}
                </Grid2>
            </Grid2>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle color="#fff">Link generado: Lado {side === "left" ? "Izquierdo" : "Derecho"}</DialogTitle>
                <DialogContent>
                    <Typography color="#fff" variant="body1">{link}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        navigator.clipboard.writeText(link);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 5000);
                    }} sx={{ background: copied ? '#4CAF50' : '#2196F3', color: '#fff', '&:hover': { background: copied ? '#388E3C' : '#1976D2' } }}>
                        {copied ? "Link copiado" : "Copiar link"}
                    </Button>

                    <Button onClick={handleCloseDialog} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Componente que te muestra el plan corredor con informmacion de la red, sus directos, sus tramos y sus puntajes */}
            <InformacionBinariosDirectos></InformacionBinariosDirectos>
            <TablaReferidos lado="izquierda"></TablaReferidos>
            <TablaReferidos lado="derecha"></TablaReferidos>

            {/* Componente que te muestra un historial de comisiones */}
            <HistorialComisiones></HistorialComisiones>
        </Grid2>
    );
};

export default SeccionPlanCorredor