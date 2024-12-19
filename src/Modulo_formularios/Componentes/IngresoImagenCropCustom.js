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
    Brightness1, Close, ContentCut,
} from "@mui/icons-material";
import imgDefecto from '../Recursos/imgDefecto.svg'
import {useEffect, useState} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const IngresoImagenCropCustom = ({
                               props,
                               dato,

                           }) => {
    const {getValues, setValue, watch} = props
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
                let imgFile = blobToFile(blob, 'nombre')
                setValue(dato, imgFile)
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
        let obj = getValues()

        console.log('img', obj[dato])

        if (typeof obj[dato] === 'object') {
            setImagen(URL.createObjectURL(obj[dato]))
        } else {
            setImagen(obj[dato])
        }

    }, [watch(dato)]);
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'center'}}>
                <img src={imagen ? imagen : imgDefecto} width={150} height={'auto'}/>
            </Grid>

            <Grid item container lg={12} sm={12} xs={12}
                  sx={{justifyContent: 'center', marginTop: -5, mr: -15}}>
                <Fab
                    variant="contained"
                    component="label"
                    sx={{p: 2}}
                >
                    <input
                        type="file"
                        hidden
                        onChange={ingresoImagen}

                    />
                    <AddAPhoto color={'primary'} sx={{width: 30, height: 30}}/>

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

                    <Grid item container lg={12} sm={12} xs={12} sx={{justifyContent: 'flex-end', marginTop: 2, px: 3}}>
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
                            autoCropArea={0.5}
                            modal={true}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}

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
export default IngresoImagenCropCustom
