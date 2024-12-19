import {getStorage, ref, uploadBytes, getDownloadURL, pu} from 'firebase/storage'
import {storage} from "../../fire";

export const subirVariosVideos = (files = [], carpeta = "default") => {

    //aun no esta probado

    let arrPromesas = []



    for (let i = 0; i < files.length; i++) {
        arrPromesas.push(subirImagen(files[i], i, carpeta))

    }

    return Promise.all(arrPromesas).then((dox) => {
        return {res: true, data: dox}
    })


}

const subirImagen = (file, index, carpeta) => {
    let nom = new Date().getTime() + index;

    console.log('entra', file)

    const mountainsRef = ref(storage, carpeta + '/' + nom + '.mp4');


    return new Promise(resolve => {

        if (typeof file === 'string') {
            return resolve(file)
        } else {

            console.log(file)
            uploadBytes(mountainsRef, file).then((snapshot) => {
                getDownloadURL(mountainsRef).then((downloadURL) => {
                    return resolve(downloadURL)
                }).catch((err) => {
                    console.log(err)
                    return resolve('')
                });
            });
        }
    })
}

