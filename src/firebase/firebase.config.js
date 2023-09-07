// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2dIQMFt3gT4JJgiGn3zIBwTcs2Mbe9PE",
  authDomain: "simple-social-media-auth.firebaseapp.com",
  projectId: "simple-social-media-auth",
  storageBucket: "simple-social-media-auth.appspot.com",
  messagingSenderId: "762738190688",
  appId: "1:762738190688:web:895b58df7c3c7809945605"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);