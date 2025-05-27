
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC4Ebv6XOengPgJ2W0-A5Oy2O2DgWGCP-U",
  authDomain: "evo-deck.firebaseapp.com",
  projectId: "evo-deck",
  storageBucket: "evo-deck.firebasestorage.app",
  messagingSenderId: "794173841232",
  appId: "1:794173841232:web:7bfbd92b7d4afc10f4d655",
  measurementId: "G-Q0PC224XC7"
};

const app = initializeApp(firebaseConfig);
getFirestore(app)
getAuth(app)

if (typeof window !== "undefined") {
  const analytics = getAnalytics(app);
  console.log(analytics);
}

export default app;

