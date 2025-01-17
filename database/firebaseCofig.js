import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const serviceAccount = {
    apiKey: "AIzaSyCnZdEliZSl7j7PwwdgbEhFNqZntumeMlE",
    authDomain: "personalportfolio-48618.firebaseapp.com",
    projectId: "personalportfolio-48618",
    storageBucket: "personalportfolio-48618.appspot.com",
    messagingSenderId: "149775001447",
    appId: "1:149775001447:web:9771c697cdb6439512b1c2",
    measurementId: "G-R1P8DMBLY5"
};

// Initialize Firebase
const firebaseApp = initializeApp( serviceAccount );

const db = getFirestore( firebaseApp );
const storage = getStorage();


export default {
    db: db,
    storage: storage,
}