// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTwDHHc-sF53PrYZUD2pSxAah2yhGu4Qc",
  authDomain: "satorbit-iss-dashboard.firebaseapp.com",
  projectId: "satorbit-iss-dashboard",
  storageBucket: "satorbit-iss-dashboard.firebasestorage.app",
  messagingSenderId: "463603914935",
  appId: "1:463603914935:web:c9b5c0576a6b8e35561532",
  measurementId: "G-7BGTPJWNLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { db };
