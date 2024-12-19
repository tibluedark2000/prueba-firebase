/**************************************************
 * Nombre:       MenuLateral
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Drawer, Grid2} from "@mui/material";
import {useState} from "react";
import {theme} from "../../Tema";
import {useMediaQuery} from "@mui/system";
import MainDashboard from "./MainDashboard";
import LogoMenu from "./SubComponentes/LogoMenu";
import ListaMenu from "./SubComponentes/ListaMenu";
import TarjetaUsuario from "./SubComponentes/TarjetaUsuario";

const MenuLateral = ({seccionesProcesadas, secciones, seccionesPerfil, salir, seccionesID}) => {
    const masSM = useMediaQuery(theme.breakpoints.up('md'))
    const [open, setOpen] = useState(masSM)
    const anchoMax = 270
    const anchoMin = 86

    return (
        <>

            <Drawer
                onClose={() => setOpen(false)}
                open={open}
                anchor={'left'}
                variant={masSM ? 'permanent' : 'temporary'}
                PaperProps={{
                    sx: {
                        borderRight: 1,
                        borderColor: '#ffffff40',
                        backgroundColor: '#131313',
                        boxShadow: open ? 0 : 12,
                        overflow: 'hidden',
                        background: masSM ? 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)'
                            : '#131313'
                    }
                }}

            >

                <Grid2
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        width: open ? anchoMax : anchoMin,
                        px: 3,
                        paddingTop: 2.6,
                        transition: "all .4s ease-in-out",
                        overflow: 'hidden',
                    }}
                >


                    <LogoMenu open={open}/>

                    <ListaMenu open={open} setOpen={setOpen} seccionesProcesadas={seccionesProcesadas}/>

                    {open &&
                        <TarjetaUsuario salir={salir}/>
                    }

                </Grid2>


            </Drawer>


            <MainDashboard open={open} setOpen={setOpen} masSM={masSM} secciones={secciones}
                           seccionesPerfil={seccionesPerfil} seccionesID={seccionesID}/>


        </>
    )

}
export default MenuLateral
