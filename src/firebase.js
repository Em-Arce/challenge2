import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAqZ6Ki3zGUykcBDgmCeGRRFIROQDpHqdg",
  authDomain: "sampleapp-a4782.firebaseapp.com",
  projectId: "sampleapp-a4782",
  storageBucket: "sampleapp-a4782.appspot.com",
  messagingSenderId: "13274093363",
  appId: "1:13274093363:web:62df18d09513bed4ef9046"
};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);