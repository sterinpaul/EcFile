// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUyBlOw85h6lUZG8Tvf9tIo-oXodhr1hM",
    authDomain: "ecfile-be1ab.firebaseapp.com",
    projectId: "ecfile-be1ab",
    storageBucket: "ecfile-be1ab.appspot.com",
    messagingSenderId: "1066860718720",
    appId: "1:1066860718720:web:2d8b439565fe104e6cd465",
    measurementId: "G-SVGNSXEFWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()
export {auth,provider}