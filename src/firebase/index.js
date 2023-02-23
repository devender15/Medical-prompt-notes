// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPmRpRI7hwW4P287BFZ8SyN0iJZp8Q6WY",
  authDomain: "medical-notes-app-ba9a5.firebaseapp.com",
  projectId: "medical-notes-app-ba9a5",
  storageBucket: "medical-notes-app-ba9a5.appspot.com",
  messagingSenderId: "239544613447",
  appId: "1:239544613447:web:ba41a8264461a043674f62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;