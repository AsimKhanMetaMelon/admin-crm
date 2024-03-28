// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXuA8T5ZJaALbj6ZgyaUiUYj3oi3GtTeg",
  authDomain: "admibcrm.firebaseapp.com",
  projectId: "admibcrm",
  storageBucket: "admibcrm.appspot.com",
  messagingSenderId: "719787338321",
  appId: "1:719787338321:web:a826a0a08d98ad10e7a670"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig , {
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false, // and this line
  });

export default app;