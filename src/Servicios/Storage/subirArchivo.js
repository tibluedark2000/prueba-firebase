import {getStorage, ref, uploadBytes, getDownloadURL,} from 'firebase/storage'
import {storage} from "../../fire";

export const subirArchivo = (crop, carpeta = "default", nom = 'na', extencion) => {


    const mountainsRef = ref(storage, carpeta + '/' + nom + '.' + extencion);

    const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);


    return new Promise(resolve => {
        uploadBytes(mountainsRef, crop).then((snapshot) => {
            getDownloadURL(mountainsRef).then((downloadURL) => {
                return resolve({res: true, data: downloadURL})
            }).catch((err) => {
                console.log(err)
                return resolve({res: false, data: err.message})
            });
        });
    })


}