// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_DmkFNKTxQ_OWtJrS0itCMbYJRZUXZrU",
    authDomain: "rolling-papers-e8c55.firebaseapp.com",
    projectId: "rolling-papers-e8c55",
    storageBucket: "rolling-papers-e8c55.appspot.com",
    messagingSenderId: "346595429351",
    appId: "1:346595429351:web:09b1ad8741c64e503fcb42"
};

export default async () => {
    const app = initializeApp(firebaseConfig);

    // Validation that our service structure is working
    // with an initialize Firebase application and auth instance.
    console.log('Firebase App Instantiation:', app)
    console.log('Firebase Auth Module:', getAuth(app))
}