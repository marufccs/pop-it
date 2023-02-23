// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz2YPKUOYcH0L2V_qxXlrE2otLl6ufY3A",
  authDomain: "pop-it-9dcd5.firebaseapp.com",
  projectId: "pop-it-9dcd5",
  storageBucket: "pop-it-9dcd5.appspot.com",
  messagingSenderId: "54165142902",
  appId: "1:54165142902:web:11b0973eb8a5db8e3a8e57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;