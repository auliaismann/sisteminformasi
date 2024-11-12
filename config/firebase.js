// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Tambahkan impor ini
import { getFirestore } from "firebase/firestore"; // Jika Anda menggunakan Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0YxycKoilFPH3z19cKj0S3h5JmGDz0Eg",
  authDomain: "sisfor-632e9.firebaseapp.com",
  projectId: "sisfor-632e9",
  storageBucket: "sisfor-632e9.firebasestorage.app",
  messagingSenderId: "114798850925",
  appId: "1:114798850925:web:d6b2bebddd141bcd50a064",
  measurementId: "G-5STR8CVG3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inisialisasi Auth
const auth = getAuth(app);

// Jika Anda juga menggunakan Firestore
const db = getFirestore(app);

export { auth, db };  // Ekspor auth dan db
export default app;
