// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeMy59vFgYGm4Duulayhhfor3f91WzQpA",
  authDomain: "fir-react-8b091.firebaseapp.com",
  projectId: "fir-react-8b091",
  storageBucket: "fir-react-8b091.appspot.com",
  messagingSenderId: "265290227049",
  appId: "1:265290227049:web:45fa2403305294e6dc71f8",
  measurementId: "G-NDMW7EKB2M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const analytics = getAnalytics(app);