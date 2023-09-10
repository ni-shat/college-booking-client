// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASAP6HryYEAhO3iNQP57OA5PD_8kkkeuc",
  authDomain: "college-booking-auth.firebaseapp.com",
  projectId: "college-booking-auth",
  storageBucket: "college-booking-auth.appspot.com",
  messagingSenderId: "921309421250",
  appId: "1:921309421250:web:f1e5b2c8f84cbcf815255b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);