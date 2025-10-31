// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG3-RttyWCo5eGJr2A9BqjtHfmqSJg5Xc",
  authDomain: "iss-tracker-iotproject.firebaseapp.com",
  projectId: "iss-tracker-iotproject",
  storageBucket: "iss-tracker-iotproject.firebasestorage.app",
  messagingSenderId: "1040715006355",
  appId: "1:1040715006355:web:4f507f426aed682ed8a866",
  measurementId: "G-75KB6BP13R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Temporary test: fetch data from Firestore
async function testFirestoreFetch() {
  try {
    const querySnapshot = await getDocs(collection(db, "iss_location"));
    querySnapshot.forEach((doc) => {
      console.log("Fetched:", doc.id, doc.data());
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call it immediately (just for testing)
testFirestoreFetch();

export { db, collection, getDocs};
