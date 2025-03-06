// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { connectFunctionsEmulator, Functions, getFunctions } from "firebase/functions"
import { FirebaseApp, FirebaseOptions } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDkqfNMTqRJdaHUGf--ZKkaYQEt8FOgrV4",
  authDomain: "relic-708e6.firebaseapp.com",
  projectId: "relic-708e6",
  storageBucket: "relic-708e6.appspot.com",
  messagingSenderId: "995376702536",
  appId: "1:995376702536:web:8126ca14e8fae54233247d",
  measurementId: "G-2G0WDR2T5B"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const db: Firestore = process.env.NODE_ENV === 'development' ? getFirestore(app, 'mock-data') :  getFirestore(app);
// const db = getFirestore(app)
const storage: FirebaseStorage = process.env.NODE_ENV === 'development' ? getStorage(app, 'gs://relic-mock-storage') : getStorage(app);
const auth: Auth = getAuth(app);
const functions: Functions =  getFunctions(app);
if (process.env.REACT_APP_EMULATORS) {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
export { db, analytics, storage, firebaseConfig, auth, functions };