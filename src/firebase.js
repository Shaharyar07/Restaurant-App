// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOc_8BsOBy7OY2DHv1XRLVZBKAImc_O4Q",
  authDomain: "restaurant-app-5f074.firebaseapp.com",
  projectId: "restaurant-app-5f074",
  storageBucket: "restaurant-app-5f074.appspot.com",
  messagingSenderId: "58662761162",
  appId: "1:58662761162:web:cd3ac3af6e7a4678d5fa33",
  measurementId: "G-SD5VKHPP5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
