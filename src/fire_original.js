// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// foxplor.colombia@gmail.com
const firebaseConfig = {
    apiKey: "AIzaSyAs-JO-aZNktynH5IHyKAfHTLlEwM3ga4I",
    authDomain: "foxplor.firebaseapp.com",
    projectId: "foxplor",
    storageBucket: "foxplor.firebasestorage.app",
    messagingSenderId: "189153997786",
    appId: "1:189153997786:web:e760f6f8dde48a426446e3",
    measurementId: "G-TYZV83SG8C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const fire = getFirestore(app)
export const storage = getStorage(app)