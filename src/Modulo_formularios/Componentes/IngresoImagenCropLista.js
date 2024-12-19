/**************************************************
 * Nombre:       IngresoTexto
 * Descripcion:
 *
 * Libreria:
 *
 * Tiempo:     1 Hr
 **************************************************/
import {Button, ButtonBase, Dialog, Fab, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {
    AddAPhoto,
    Brightness1, Close, ContentCut, Delete,
} from "@mui/icons-material";
import imgDefecto from '../Recursos/imgDefecto.svg'
import {useEffect, useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const IngresoImagenCropLista = ({
                                    props,
                                    dato,
                                    alto = 1,
                                    ancho = 1

                                }) => {
    const {getValues, setValue, watch} = props
    const [items, setItems] = useState([])


    const IngresoImagen = ({index}) => {
        const [imagen, setImagen] = useState('')
        const [open, setOpen] = useState(false)
        const [cropper, setCropper] = useState("");

        const abrir = () => {
            setOpen(true)
        }

        const cerrar = () => {
            setImagen('')
            setOpen(false)
        }

        const getCropData = () => {

            if (typeof cropper !== "undefined") {
                cerrar()

                cropper.getCroppedCanvas().toBlob(function (blob) {
                    let imgFile = blobToFile(blob, ('nombre' + index))
                    let arr = items

                    setItems((arrIt) => arrIt.concat(imgFile))
                    arr.push(imgFile)
                    setValue(dato, arr)

                });

            }
        };

        function blobToFile(theBlob, fileName) {
            theBlob.lastModifiedDate = new Date();
            theBlob.name = fileName;
            return theBlob;
        }

        const ingresoImagen = (data) => {
            if (data.target.files && data.target.files[0]) {
                let urlImagen = URL.createObjectURL(data.target.files[0])
                setImagen(urlImagen)
                abrir()
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
                            onChange={ingresoImagen}

                        />
                        <AddAPhoto color={'primary'} sx={{width: 24, height: 24,}}/>

                    </Fab>
                </Grid>


                <Dialog open={open} fullWidth maxWidth={"xs"}
                        PaperProps={{
                            style: {borderRadius: 10}
                        }}
                >

                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"

                    >

                        <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-end', marginTop: 1}}>
                            <Button
                                onClick={() => cerrar()}
                                variant={'text'} sx={{color: '#00000080'}} endIcon={<Close/>}>Cancelar</Button>
                        </Grid>

                        <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center', marginTop: 4}}>
                            <Typography sx={{fontSize: 20, fontWeight: 600}}>Recortar Imagen</Typography>

                        </Grid>

                        <Grid item container sx={{justifyContent: "center", marginTop: 4}}>


                            <Cropper
                                style={{
                                    height: 350,
                                    width: 350,
                                }}
                                src={imagen}
                                viewMode={2}
                                guides={true}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={true}
                                responsive={true}
                                autoCropArea={1}
                                modal={true}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                aspectRatio={ancho / alto}
                            />

                        </Grid>

                        <Grid item container sx={{justifyContent: "center", marginTop: 4, marginBottom: 4}}>


                            <Button startIcon={<ContentCut/>} color={"secondary"}
                                    onClick={() => getCropData()}
                            >Realizar Recorte</Button>
                        </Grid>

                    </Grid>

                </Dialog>

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
            setValue(dato, arr)
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
                    <img src={itemImg ? itemImg : imgDefecto} width={100} height={'auto'}/>
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
                    <Grid item container lg={4} sm={4} xs={6} sx={{justifyContent: 'flex-start'}}>
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
export default IngresoImagenCropLista
