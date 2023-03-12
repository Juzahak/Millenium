// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqW2wdOmJhixSQNCZ5_ACdodQW1PNCVtQ",
  authDomain: "millenium-6b410.firebaseapp.com",
  projectId: "millenium-6b410",
  storageBucket: "millenium-6b410.appspot.com",
  messagingSenderId: "1005004193676",
  appId: "1:1005004193676:web:a2ca1532f9bedd77f0a0a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage();



