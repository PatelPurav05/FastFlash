
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqEf8Deim0GUD5dsXnRU4-Wn9GGXPZaiE",
  authDomain: "fastflash-625e3.firebaseapp.com",
  projectId: "fastflash-625e3",
  storageBucket: "fastflash-625e3.appspot.com",
  messagingSenderId: "916390661190",
  appId: "1:916390661190:web:231905c9736bc888d38e47",
  measurementId: "G-YEWMPK2218"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

