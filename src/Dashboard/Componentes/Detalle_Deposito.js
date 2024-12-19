/**************************************************
 * Nombre:       Perfil_Proyectos
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Grid2, TextField, Typography} from "@mui/material";
import {useContext, useState} from "react";
import BotonCripto from "../../Modulo_BotonCripto/Componentes/BotonCripto";
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";


const Detalle_Deposito = ({usuario}) => {
    const {sCell} = useResponsive()
    const [numero, setNumero] = useState(35)


    return (
        <Grid2
            container
            size={12}
            sx={{
                p: 3,
                background: 'linear-gradient(180deg, rgba(217, 217, 217, 0.1) 0%, rgba(115, 115, 115, 0.1) 100%)',
                border: 1,
                borderColor: '#ffffff40',
                borderRadius: 3,
                pb: 3,
                alignItems: 'center'
            }}
            spacing={2}
        >


            <Grid2 container size={{xs: 6, sm: 6, md: 12}} sx={{marginBottom: 0}}>
                <Typography sx={{color: '#fff', fontSize: 24, fontWeight: 600}}>Deposito</Typography>
            </Grid2>

            <Grid2 container size={{xs: 6, sm: 3, md: 3}} sx={{marginBottom: 0}}>
                <TextField
                    color={'secondary'}
                    size={'small'}
                    focused
                    sx={{color: '#fff'}}
                    InputProps={{
                        disableUnderline: true,
                        sx: {color: '#fff'},
                    }}
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    variant={'outlined'} label={"Valor a depocitar"}/>
            </Grid2>

            <Grid2 container size={{xs: 12 , sm: 12, md: 7}} sx={{marginBottom: 0, justifyContent: 'center'}}>
                <BotonCripto nombre={usuario?.nombre} valor={numero} idUsuario={usuario?.id}/>
            </Grid2>

        </Grid2>
    )

}
export default Detalle_Deposito