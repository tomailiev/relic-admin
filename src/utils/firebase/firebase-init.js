// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkqfNMTqRJdaHUGf--ZKkaYQEt8FOgrV4",
  authDomain: "relic-708e6.firebaseapp.com",
  projectId: "relic-708e6",
  storageBucket: "relic-708e6.appspot.com",
  messagingSenderId: "995376702536",
  appId: "1:995376702536:web:8126ca14e8fae54233247d",
  measurementId: "G-2G0WDR2T5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = process.env.NODE_ENV === 'development' ? getFirestore(app, 'mock-data') :  getFirestore(app);
// const db = getFirestore(app)
const storage = process.env.NODE_ENV === 'development' ? getStorage(app, 'gs://relic-mock-storage') : getStorage(app);
const auth = getAuth(app);
const functions =  getFunctions(app);
if (process.env.REACT_APP_EMULATORS) {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}
export { db, analytics, storage, firebaseConfig, auth, functions };