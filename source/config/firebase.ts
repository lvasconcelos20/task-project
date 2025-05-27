
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmZ8m35KrEvy1LexrjxXTxY9v1sxE-MNM",
  authDomain: "tasksphere-auth.firebaseapp.com",
  projectId: "tasksphere-auth",
  storageBucket: "tasksphere-auth.firebasestorage.app",
  messagingSenderId: "995700500824",
  appId: "1:995700500824:web:53d2fadbb3b9f3ed995d2d"
};

const app = initializeApp(firebaseConfig);
getFirestore(app)
getAuth(app)

export default app;

