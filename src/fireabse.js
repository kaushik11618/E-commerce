// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDOp0AQBXqZFKZXcvf4iiqknIxykTBr4ZE",
  authDomain: "e-commerce-75d24.firebaseapp.com",
  projectId: "e-commerce-75d24",
  storageBucket: "e-commerce-75d24.appspot.com",
  messagingSenderId: "521115807438",
  appId: "1:521115807438:web:4b2c1709fa8f2af49caa9f",
  measurementId: "G-B7NCYJ1MQT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
export { auth, db ,storage};