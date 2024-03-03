'use client'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
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
try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  if (!/already exists/.test(e.message)) {
    console.error('Firebase initialization error', e.stack);
  }
}
const fb = firebase;



export default fb;