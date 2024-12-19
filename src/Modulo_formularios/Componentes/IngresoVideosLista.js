/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, Dialog, Fab, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {
    AddAPhoto,
    Brightness1, Close, ContentCut, Delete,
} from "@mui/icons-material";
import imgDefecto from '../Recursos/imgDefecto.svg'
import {useEffect, useState} from "react";
import Cropper from "react-cropper";


const IngresoVideosLista = ({
                                props,
                                dato,

                            }) => {
    const {getValues, setValue, watch} = props
    const [items, setItems] = useState([])


    const IngresoImagen = ({index}) => {


        const ingresoImagen = (data) => {
            if (data.target.files && data.target.files[0]) {
                let arr = items
                setItems((arrIt) => arrIt.concat(data.target.files[0]))
                arr.push(data.target.files[0])

                setValue(dato, arr)

            }
        }

        useEffect(() => {
            let lista = getValues(dato)
            if (lista) {
                setItems(lista)
            }
        }, []);


        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    <img src={imgDefecto} width={100} height={'auto'}/>
                </Grid>

                <Grid item container lg={12} sm={12} xs={12}
                      sx={{justifyContent: 'center', marginTop: -5, mr: -9}}>
                    <Fab
                        variant="contained"
                        component="label"
                        sx={{p: 0}}
                        size={'medium'}
                    >
                        <input
                            type="file"
                            hidden
                            accept="video/mp4"
                            onChange={ingresoImagen}

                        />
                        <AddAPhoto color={'primary'} sx={{width: 24, height: 24,}}/>

                    </Fab>
                </Grid>


            </Grid>

        )
    }

    const EditarImagen = ({index, item}) => {
        const [itemImg, setItemImg] = useState('')


        const borrarItem = () => {


            let arr = []
            for (let i = 0; i < items.length; i++) {
                if (item !== items[i]) {
                    arr.push(items[i])
                }
            }

            setItems(arr)
            setValue(dato,arr)

        }

        useEffect(() => {


            if (typeof item === 'object') {
                setItemImg(URL.createObjectURL(item))
            } else {
                setItemImg(item)
            }


        }, [item]);
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                    {!itemImg ?

                        <img src={imgDefecto} width={100} height={'auto'}/>
                        :
                        <video style={{width: '100%'}} loop muted controls={true}
                        >
                            <source src={itemImg} type='video/mp4'/>
                        </video>
                    }

                </Grid>

                <Grid item container lg={12} sm={12} xs={12}
                      sx={{justifyContent: 'center', marginTop: -4, mr: -9}}>
                    <Fab
                        onClick={() => borrarItem(item)}
                        variant="contained"
                        component="label"
                        sx={{p: 0}}
                        size={'small'}

                    >

                        <Delete sx={{width: 20, height: 20, fill: '#00000080'}}/>

                    </Fab>
                </Grid>
            </Grid>

        )
    }


    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
        >

            {items.map((item, index) => {
                return (
                    <Grid item key={`as${index}`} container lg={4} sm={4} xs={6} sx={{justifyContent: 'flex-start'}}>
                        <EditarImagen index={index} item={item}/>
                    </Grid>
                )
            })}

            <Grid item container lg={4} sm={4} xs={6} sx={{justifyContent: 'flex-start'}}>
                <IngresoImagen index={items.length}/>
            </Grid>

        </Grid>
    )

}
export default IngresoVideosLista
