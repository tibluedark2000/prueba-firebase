import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {storage} from "../../fire";

export const subirUnaImagenCroper = (crop, carpeta = "default") => {

    let nom = new Date().getTime();



    const mountainsRef = ref(storage, carpeta + '/' + nom + '.jpg');

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