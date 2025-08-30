// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0F343kle7p_-bUaSsELx3aLiqVc4e5ks",
  authDomain: "busybuy-mini-project.firebaseapp.com",
  projectId: "busybuy-mini-project",
  storageBucket: "busybuy-mini-project.firebasestorage.app",
  messagingSenderId: "236244318147",
  appId: "1:236244318147:web:ebf2351ca08bd263136f76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);