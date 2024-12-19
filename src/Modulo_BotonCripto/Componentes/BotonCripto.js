/**************************************************
 * Nombre:       BotonCripto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {useEffect, useState} from "react";
import {Grid, InputAdornment, MenuItem, TextField} from "@mui/material";
import {CRIPTOS} from "../Constantes";
import {CurrencyBitcoin} from "@mui/icons-material";
import {useResponsive} from "../../Modulo_responsive/Hooks/useResponsive";


const BotonCripto = ({valor = 0, nombre, idUsuario}) => {
    const {sCell, masSM} = useResponsive()
    const [criptoEscogida, setCriptoEscogida] = useState('')
    const [seleccion, setSelecciones] = useState(CRIPTOS.map((it) => it.nombre)[0])


    useEffect(() => {
        let index = CRIPTOS.findIndex((e) => e.nombre === seleccion)
        let esco = CRIPTOS[index]
        setCriptoEscogida(esco)

    }, [seleccion])
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems={!masSM ? 'flex-start' : "center"}
            spacing={2}
            sx={{marginBottom: !masSM ? -36 : 0}}
        >

            <Grid item container lg={9} sm={6} xs={12} sx={{justifyContent: 'flex-start', marginTop: !masSM ? 2 : 0}}>
                <TextField
                    label={'Paga con Criptomodeda'}
                    fullWidth
                    select
                    size={'small'}
                    color={'secondary'}
                    focused
                    variant={'outlined'}
                    value={seleccion}
                    onChange={(e) => setSelecciones(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <CurrencyBitcoin color={'primary'}/>
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                        sx: {color: '#fff'}

                    }}
                >
                    {CRIPTOS.map((c, i) => (
                        <MenuItem key={`c-${i}`} value={c.nombre}>
                            {c.nombre}
                        </MenuItem>
                    ))}
                </TextField>

            </Grid>

            <Grid item container lg={3} sm={6} xs={12}
                  sx={{justifyContent: !masSM ? 'center' : 'flex-start', ml: !masSM ? -1 : 0, mr: !masSM ? -1 : 0}}>
                <iframe

                    src={`https://boton.foxplor.app/?valor=${valor}&red=${criptoEscogida.red}&token=${criptoEscogida.token}&llave=${criptoEscogida.llave}&nombre=${nombre}&idUsuario=${idUsuario}`}
                    style={{
                        border: 1,
                        width: !masSM ? '100%' : 200,
                        height: !masSM ? 350 : 68,
                        paddingLeft: sCell ? 0 : 0,

                    }}/>
            </Grid>

        </Grid>


    )

}
export default BotonCripto    