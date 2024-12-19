// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// foxplor.colombia@gmail.com
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9XO8ioxb7QkRh2Zv-CF1QzFBXm8yvpzc",
    authDomain: "prueba-6d53c.firebaseapp.com",
    projectId: "prueba-6d53c",
    storageBucket: "prueba-6d53c.firebasestorage.app",
    messagingSenderId: "325605957268",
    appId: "1:325605957268:web:b915eed728975bdab69e81",
    measurementId: "G-VW3E1Y3KSP"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const fire = getFirestore(app)
export const storage = getStorage(app)