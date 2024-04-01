// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVhDMMF51Phia250cMLyCz2JAgk8xBYWg",
  authDomain: "admincrmmetamelon.firebaseapp.com",
  projectId: "admincrmmetamelon",
  storageBucket: "admincrmmetamelon.appspot.com",
  messagingSenderId: "374584830221",
  appId: "1:374584830221:web:f514d81f572707d3b96844"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig , {
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false, // and this line
  });

export default app;