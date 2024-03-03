
import { GoogleAuthProvider, getAuth, signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApp, getApps } from 'firebase/app';

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyc8N3mzwws18FEkH4Rg_aX4aJOpfqX3s",
  authDomain: "local-lens-335b9.firebaseapp.com",
  projectId: "local-lens-335b9",
  storageBucket: "local-lens-335b9.appspot.com",
  messagingSenderId: "809553777428",
  appId: "1:809553777428:web:cde197b185d081c27c2801"
  
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const provider = new GoogleAuthProvider();

const auth = getAuth(app);

/* onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    console.log("User is signed out");
    // User is signed out
    // ...
  }
}); */

export const signInWithGoogle = () => signInWithRedirect(auth, provider);