/**************************************************
 * Nombre:       BarraPc
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Grid2} from "@mui/material";
import logo from '../../Recursos/logo.svg'
import {Home} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";
import {LINKPAGINA} from "../../Constantes";

const BarraPc = ({isHome}) => {
    const navigate = useNavigate()
    const {masSM, sCell} = useResponsive()

    return (
        <Grid2
            container
            size={12}
            sx={{justifyContent:'center'}}
        >

            <Grid2
                container
                size={12}
                sx={{maxWidth: '1400px', px: 3, py: masSM ? 4 : 3, alignItems: 'center'}}
            >

                <Grid2 item size={{xs: 5, sm: 6}} sx={{marginTop: 1}}>
                    <img src={logo} width={masSM ? 220 : 150} height={'auto'}
                    />
                </Grid2>

                <Grid2 container item size={{xs: 7, sm: 6}} sx={{justifyContent: 'flex-end'}} spacing={masSM ? 2 : 0}>


                    <Button
                        onClick={() => navigate('/Home')}
                        color={'secondary'}
                        href={LINKPAGINA}
                        variant={'outlined'}
                        startIcon={<Home/>}
                        sx={{

                            color: '#fff',
                        }}>{masSM ? 'Ir a Pagina' : 'Ir a home'}</Button>
                    :


                </Grid2>


            </Grid2>


        </Grid2>
    )

}
export default BarraPc