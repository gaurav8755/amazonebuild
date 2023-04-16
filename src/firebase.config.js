// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFEuRPkxgPmuhyKz7bE45Hpk7dHxNEVck",
  authDomain: "gb-ed27f.firebaseapp.com",
  projectId: "gb-ed27f",
  storageBucket: "gb-ed27f.appspot.com",
  messagingSenderId: "120580248727",
  appId: "1:120580248727:web:3e4aa7d289d4fc19b185d2",
  measurementId: "G-J834LTBRZ2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig