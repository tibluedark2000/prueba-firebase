import axios from "axios";
import {URLAPISUBIDA, URLCARPETADESTINO} from "./Contantes";

export const subirImagenHostingFile = (file) => {


    return new Promise(resolve => {
        if (typeof file === 'string') {
            return resolve({res: true, data: file})
        } else {

            const formData = new FormData();
            formData.append('img', file);

            axios.post(URLAPISUBIDA, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    return resolve({res: true, data: URLCARPETADESTINO + response.data.file_path})
                    // Handle successful upload response
                })
                .catch(error => {
                    return resolve({res: false, data: error.message})
                });


        }
    })


}

const createFile = (bits, name) => {
    try {
        // If this call fails, we go for Blob
        return new File(bits, name);
    } catch (e) {
        // If we reach this point a new File could not be constructed
        var myBlob = new Blob(bits);
        myBlob.lastModified = new Date();
        myBlob.name = name;
        return myBlob;
    }
};