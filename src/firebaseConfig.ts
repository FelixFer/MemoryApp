// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBudt-PyH6WkclvKR-ZqMWKLl5-Kb4a24s",
  authDomain: "memory-451a4.firebaseapp.com",
  projectId: "memory-451a4",
  storageBucket: "memory-451a4.appspot.com",
  messagingSenderId: "440780929222",
  appId: "1:440780929222:web:9421a4bef7b8caa6477fc7",
  measurementId: "G-XNXRRGR0WX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);