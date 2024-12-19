import {getStorage, ref, uploadBytes, getDownloadURL, pu} from 'firebase/storage'
import {storage} from "../../fire";

export const subirImagenFile = (file, carpeta = "default") => {

    let nom = new Date().getTime();


    const mountainsRef = ref(storage, carpeta + '/' + nom + '.png');


    return new Promise(resolve => {

        if (typeof file === 'string') {
            return resolve({res: true, data: file})
        } else {
            uploadBytes(mountainsRef, file).then((snapshot) => {
                getDownloadURL(mountainsRef).then((downloadURL) => {
                    return resolve({res: true, data: downloadURL})
                }).catch((err) => {
                    console.log(err)
                    return resolve({res: false, data: err.message})
                });
            });
        }
    })


}

