import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLtmel1ulA_efayl9-i8Xo4sSMjUUP028",
  authDomain: "local-lens-2777d.firebaseapp.com",
  projectId: "local-lens-2777d",
  storageBucket: "local-lens-2777d.appspot.com",
  messagingSenderId: "380982188933",
  appId: "1:380982188933:web:2b04d5f106eb0b27f442ec"
};

const app = initializeApp(firebaseConfig);

let analytics;
// Check if Analytics is supported in the current environment
isSupported().then((isSupported) => {
  if (isSupported) {
    analytics = getAnalytics(app);
  } else {
    console.warn("Firebase Analytics is not supported in this environment");
  }
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);